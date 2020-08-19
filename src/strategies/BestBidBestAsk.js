const Calcs = require('../helpers/Calcs');
const BigNumber = require('bignumber.js');
const RANGE = 0.05; // 5%


const newBidOrders = (bestBid) => {
  const from = (new BigNumber(bestBid[0])).toFixed(5);
  const to = (new BigNumber(bestBid[0])).plus(new BigNumber(bestBid[0]).multipliedBy(RANGE)).toFixed(5);
  const orders = [];
  for (let i = 0; i < 5; i++) {
    orders.push({
      value: Calcs.randomFloat(from, to),
      originalPrice: bestBid[0]
    })
  }
  return orders;
};

const newAskOrders = (bestAsk) => {
  const from = (new BigNumber(bestAsk[0])).toFixed(5);
  const to = (new BigNumber(bestAsk[0])).minus(new BigNumber(bestAsk[0]).multipliedBy(RANGE)).toFixed(5);
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
  run: (orders) => {
    const { bids, asks } = Calcs.splitBidAndAsk(orders);
    const bestBid = Calcs.bestBid(bids);
    const bestAsk = Calcs.bestAsk(asks);
    const newBids = newBidOrders(bestBid);
    const newAsks = newAskOrders(bestAsk);
    console.log(`Best BID: ${bestBid[0]} Best ASK: ${bestAsk[0]}`);

    return {
      bids: newBids,
      asks: newAsks
    }
  }

};

module.exports = BestBidBestAsk;