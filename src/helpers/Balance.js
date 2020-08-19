const BigNumber = require('bignumber.js');
const INIT_ETH = 10;
const INIT_USD = 20000;

let BALANCE = {
  'ETH': new BigNumber(INIT_ETH).toFixed(18), // Eth have 18 decimals
  'USD': new BigNumber(INIT_USD).toFixed(5) // USD we use 5 decimals
}

const Balance = {
  get: () => {
    return BALANCE;
  },
  update: (newBalance) => {
    BALANCE = newBalance;
    return BALANCE;
  }
}

module.exports = Balance;