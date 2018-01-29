import Promise from 'bluebird';
import contract from 'truffle-contract';

import Protocol from '../contracts/Protocol';
import Mechanism from '../contracts/Mechanism';
import Scorer from '../contracts/Scorer';

const CONTRACTS = [ Protocol, Mechanism, Scorer ];

const DEPLOYED = {
  Protocol: "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f",
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

export function fetch(web3) {
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