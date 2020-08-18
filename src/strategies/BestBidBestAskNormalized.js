const Calcs = require('../helpers/Calcs');



const BestBidBestAsk = {
  run: (orders) => {
    const { bids, asks } = Calcs.splitBidAndAsk(orders);
    const bestBids = Calcs.bestBid(bids);
    const bestAsks = Calcs.bestBid(asks);

    console.log(' BEST 5 BIDS ', bestBids)
    console.log(' BEST 5 ASK ', bestAsks)
  },
};

module.export = BestBidBestAsk;