const Calcs = require('../helpers/Calcs');

const BestBidBestAsk = {
  run: (orders) => {
    const { bids, asks } = Calcs.splitBidAndAsk(orders);
    console.log('ASKS ', asks)
    const bestBids = Calcs.bestBid(bids);
    const bestAsks = Calcs.bestAsk(asks);

    console.log(' BEST 5 BIDS ', bestBids)
    console.log(' BEST 5 ASK ', bestAsks)
  },
  newBidOrders: (bestBids) => {

  },
  newAskOrders: (bestAsk) => {

  }
};

module.exports = BestBidBestAsk;