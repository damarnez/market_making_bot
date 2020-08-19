const QuickSort = require('../utils/Sort');
const BigNumber = require('bignumber.js');
const Calcs = {
  bestBid: (data) => {
    const sorted = QuickSort(data, (a, b) => {
      return new BigNumber(a[0]).comparedTo(b[0]);
    });

    return sorted[0];
  },
  bestAsk: (data) => {
    const sorted = QuickSort(data, (a, b) => {
      return new BigNumber(b[0]).comparedTo(a[0]);
    });
    return sorted[0];
  },
  splitBidAndAsk: (data) => {
    return data.reduce((prev, next) => {
      if (next) {
        // Positive numbers are orders to buy and negative to sell
        if (new BigNumber(next[2]).isGreaterThanOrEqualTo(0) > 0) {
          //Bids
          prev.bids.push(next);
        } else {
          // Asks
          prev.asks.push(next);
        }
        return prev;
      }
    }, { bids: [], asks: [] });
  },
  randomFloat: (from, to) => {
    const formula = (new BigNumber(from).minus(new BigNumber(to))).plus(new BigNumber(to));
    return BigNumber.random().multipliedBy(formula).toFixed(5);
  }

}

module.exports = Calcs;
