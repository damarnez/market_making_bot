const BigNumber = require('bignumber.js');

let BALANCE = {
  'ETH': new BigNumber(process.env.INIT_ETH || "10.000000000000000000").toFixed(18), // Eth have 18 decimals
  'USD': new BigNumber(process.env.INIT_USD || "20000.00000").toFixed(5) // USD we use 5 decimals
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