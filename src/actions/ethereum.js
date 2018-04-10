import Promise from 'bluebird';
import contract from 'truffle-contract';

import Protocol from '../contracts/Protocol';
import Mechanism from '../contracts/Mechanism';
import RBTS from '../contracts/RBTS';
import Truecoin from '../contracts/Truecoin';

const CONTRACTS = [ Protocol, Mechanism, RBTS, Truecoin ];

// // Ropsten
// const DEPLOYED = {
//   Protocol: "0x6272ea4a37697df1472690769331ef0a1d6b657e",
//   RBTS: "0x54f4e4432891efc599585d7f7e9c04cef239746f",
//   Truecoin: "0x6470d00c03818cc99d748202b80cda924ed402eb",
// };

// Rinkeby
const DEPLOYED = {
  Protocol: "0x1ade409c46f2b883a487d7c0eb76f10d3c092592",
     RBTS: "0x9785a584836bfb6dba0b586928a3f422916b3e24",
    Truecoin: "0x553f4bde53bcd2e4fabea4e8577bafc2d740c84d"
};

// // Development
// const DEPLOYED = {
//   Protocol: "0x6b395f24622e6a55797495eddd09a8e33bf2e424",
//   RBTS:  "0x2184e60838167fb19942bc558239b57b1db2540a"
// };

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