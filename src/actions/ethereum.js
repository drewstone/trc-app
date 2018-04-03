import Promise from 'bluebird';
import contract from 'truffle-contract';

import Protocol from '../contracts/Protocol';
import Mechanism from '../contracts/Mechanism';
import RBTS from '../contracts/RBTS';
import Truecoin from '../contracts/Truecoin';

const CONTRACTS = [ Protocol, Mechanism, RBTS, Truecoin ];

// Ropsten
const DEPLOYED = {
  Protocol: "0x88059c7081e21e9044df4e8c7e0aac278e491a58",
  RBTS: "0x6b28b41b5cbf4f5496ea9a3c854360a2afe9ea01",
  Truecoin: "0x79c59c61e2b47788069684e4ebfb88af1c13de8e",
};

// // Rinkeby
// const DEPLOYED = {
//   Protocol: "0xd996e9e1aaaa20d31d8889965b6ad293d2994f35",
// };

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