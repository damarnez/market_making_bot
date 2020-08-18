
const Balance = require('../helpers/Balance');

const CheckBalances = {
  run: () => {
    const balances = Balance.get();
    console.log(` BALANCE USD ${balances.USD} ETH ${balances.ETH}`);
  }
}

module.exports = CheckBalances;