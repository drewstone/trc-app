import compile from './compile';

export default function () {
  return compile().then(contracts => {
    return Object.keys(contracts).reduce((prev, curr) => {
      const contract = contracts[curr];
      contract.setProvider(window.web3);
      return Object.assign({}, prev, { [curr]: contract })
    }, {});
  });
}
