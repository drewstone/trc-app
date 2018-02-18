import Promise from 'bluebird';
import contract from 'truffle-contract';

import Protocol from '../contracts/Protocol';
import Mechanism from '../contracts/Mechanism';
import RBTS from '../contracts/RBTS';

const CONTRACTS = [ Protocol, Mechanism, RBTS ];

const DEPLOYED = {
  Protocol: "0x822f93e8fee8968b764c2d825cb4a9c999509233",
};

function setup() {
  return Promise.resolve(CONTRACTS.map(c => {
    return ({ name: c.contract_name, contract: contract(c)});
  })
  .reduce((prev, curr) => {
    return Object.assign({}, prev, {[curr.name]: curr.contract});
  }, {}));
}

function compile(web3) {
  return setup().then(contracts => {
    return Object.keys(contracts).reduce((prev, curr) => {
      const contract = contracts[curr];
      return Object.assign({}, prev, { [curr]: contract })
    }, {});
  });
}

function fetch(web3) {
  return compile(web3).then(contracts => {
    return Promise.map(Object.keys(contracts), c => {
      contracts[c].setProvider(web3.currentProvider);
      contracts[c].defaults({from: web3.eth.coinbase});
      return (!!DEPLOYED[c])
        ? Promise.props({ [c]: contracts[c].at(DEPLOYED[c]) })
        : { [c]: contracts[c] };
    });
  });
}

export default {
  fetchContracts: (web3) => {
    return fetch(web3).then(contracts => {
      return contracts.reduce((prev, curr) => {
        return Object.assign({}, prev, curr);
      }, {});
    });
  },
}