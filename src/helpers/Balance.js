const INIT_ETH = 10;
const INIT_USDT = 20000;

let BALANCE = {
  'ETH': INIT_ETH,
  'USD': INIT_USDT
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