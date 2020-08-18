const QuickSort = require('../utils/Sort');
const BigNumber = require('bignumber.js');
const Calcs = {
  bestBid: (data, total = 5) => {
    const sorted = QuickSort(data, (a, b) => {
      return new BigNumber(a[0]).comparedTo(b[0]);
    });
    return sorted.slice(0, total);
  },
  bestAsk: (data, total = 5) => {
    const sorted = QuickSort(data, (a, b) => {
      return new BigNumber(b[0]).comparedTo(a[0]);
    });
    return sorted.slice(0, total);
  },
  splitBidAndAsk: (data) => {
    return data.reduce((prev, next) => {
      if (next) {
        // Positive numbers are orders to buy and negative to sell
        if (new BigNumber(next[2]).isGreaterThanOrEqualTo(0) > 0) {
          //Bids
          prev.bids.push(next);
        } else {
          console.log('ASK')
          // Asks
          prev.asks.push(next);
        }
        return prev;
      }
    }, { bids: [], asks: [] });
  }

}

module.exports = Calcs;
