const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Artifactor = require('truffle-artifactor');
const contract = require('truffle-contract');
const config = require('../config/contracts_config');

module.exports = function() {
  const dirPath = path.join(path.resolve('./'), 'src/contracts');
  const artifactor = new Artifactor(dirPath);

  return initialize(dirPath, artifactor)
  .then(res => {
    let files = fs.readdirSync(dirPath);
    return files.map(f => {
      return {
        [f.split('.')[0]]: contract(JSON.parse(fs.readFileSync(path.join(dirPath, f))))
      };
    }).reduce((prev, curr) => (Object.assign({}, prev, curr)));
  });
}

function initialize(dirPath, artifactor) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  } 

  return compile(artifactor, config.CONTRACTS_DIRECTORY);
}

function compileDirectory(dirPath) {
  let data = fs.readdirSync(dirPath);
  return data.map(ctc => {
    return { ctc, data: fs.readFileSync(`${dirPath}/${ctc}`).toString() };
  });
}

function recursiveCompile(path) {
  const data = fs.readdirSync(path).filter(file => !file.includes('.DS_Store'));
  let contractData = [];
  for (ctc in data) {
    if (data[ctc].split('.').length > 1) {
      const trimmed_contract = fs.readFileSync(`${path}/${data[ctc]}`)
        .toString()
        .replace(new RegExp('../mechanism/', 'g'), './')
        .replace(new RegExp('../math/', 'g'), './')

      contractData.push({ ctc: data[ctc], data: trimmed_contract });
    } else {
      let dirName = `${path}/${data[ctc]}`;
      const dirData = recursiveCompile(dirName);
      contractData = [ ...contractData, ...dirData ];  
    }
  }

  return contractData;
}

function compile(artifactor, path) {
  contractData = recursiveCompile(path).reduce((prev, curr) => (Object.assign({}, prev, {[curr.ctc]: curr.data})), {});
  const output = solc.compile({ sources: contractData }, 1);

  const contracts = Object.keys(output.contracts).map(key => ({
      contract_name: key.split(':')[1],
      abi: JSON.parse(output.contracts[key].interface),
      unlinked_binary: output.contracts[key].bytecode,
  }))
  .reduce((prev, curr) => {
    return Object.assign({}, prev, {[curr.contract_name]: curr});
  }, {})

  return artifactor.saveAll(contracts);
}