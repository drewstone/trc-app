import Promise from 'bluebird';
import compile from './compile';

const DEPLOYED = {
  RBTSMechanism: "0xa4392264a2d8c998901d10c154c91725b1bf0158",
  EndogenousMechanism: "0xb529f14aa8096f943177c09ca294ad66d2e08b1f",
  MechanismManager: "0x3d49d1ef2ade060a33c6e6aa213513a7ee9a6241",
  TruecoinProtocol: "0x2a504b5e7ec284aca5b6f49716611237239f0b97",
};

export function deploy(web3) {
  return compile(web3).then(contracts => {
    return Promise.map(Object.keys(contracts), c => {
      contracts[c].setProvider(web3.currentProvider);
      contracts[c].defaults({from: web3.eth.coinbase});
      return Promise.props({ [c]: contracts[c].at(DEPLOYED[c]) });
    });
  });
}