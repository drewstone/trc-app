import compile from './compile';

export default function (web3) {
  return compile().then(contracts => {
    return {
      TruecoinProtocol: () => {

      },
      RBTSMechanism: () => {

      }
    };
  });
}
