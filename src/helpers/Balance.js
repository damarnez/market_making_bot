const BigNumber = require('bignumber.js');

let BALANCE = {
  'ETH': new BigNumber(process.env.INIT_ETH).toFixed(18), // Eth have 18 decimals
  'USD': new BigNumber(process.env.INIT_USD).toFixed(5) // USD we use 5 decimals
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