import Promise from 'bluebird';
import contract from 'truffle-contract';

import TruecoinProtocol from '../contracts/TruecoinProtocol';
import RBTSMechanism from '../contracts/RBTSMechanism';
import EndogenousMechanism from '../contracts/EndogenousMechanism';
import MechanismManager from '../contracts/MechanismManager';

function setup() {
  const contracts = [ MechanismManager, TruecoinProtocol, RBTSMechanism, EndogenousMechanism];
  
  return Promise.resolve(contracts.map(c => {
    return ({ name: c.contract_name, contract: contract(c)});
  })
  .reduce((prev, curr) => {
    return Object.assign({}, prev, {[curr.name]: curr.contract});
  }, {}));
}

export default function (web3) {
  return setup().then(contracts => {
    return Object.keys(contracts).reduce((prev, curr) => {
      const contract = contracts[curr];
      return Object.assign({}, prev, { [curr]: contract })
    }, {});
  });
}