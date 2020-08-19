const Calcs = require('../helpers/Calcs');
const BigNumber = require('bignumber.js');
const RANGE = parseFloat(process.env.RANGE_ORDERS || 0.05); // 5%
const NUM_ORDERS = parseInt(process.env.NUM_ORDERS || 5);

const newBidOrders = (bestBid) => {
  const to = (new BigNumber(bestBid[0])).toFixed(5);
  const from = (new BigNumber(bestBid[0])).minus(new BigNumber(bestBid[0]).multipliedBy(RANGE)).toFixed(5);
  const orders = [];
  for (let i = 0; i < NUM_ORDERS; i++) {
    orders.push({
      value: Calcs.randomFloat(from, to),
      originalPrice: bestBid[0]
    })
  }
  return orders;
};

const newAskOrders = (bestAsk) => {

  const from = (new BigNumber(bestAsk[0])).toFixed(5);
  const to = (new BigNumber(bestAsk[0])).plus(new BigNumber(bestAsk[0]).multipliedBy(RANGE)).toFixed(5);
  const orders = [];
  for (let i = 0; i < 5; i++) {
    orders.push({
      value: Calcs.randomFloat(from, to),
      originalPrice: bestAsk[0]
    })
  }
  return orders;
}

const BestBidBestAsk = {
  run: async (orders) => {
    const { bids, asks } = Calcs.splitBidAndAsk(orders);
    const bestBid = Calcs.bestBid(bids);
    const bestAsk = Calcs.bestAsk(asks);
    const newBids = newBidOrders(bestBid);
    const newAsks = newAskOrders(bestAsk);

    return {
      bids: newBids,
      asks: newAsks
    }
  }

};

module.exports = BestBidBestAsk;