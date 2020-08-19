
const Calcs = require('./Calcs');
const Balance = require('./Balance');
const BigNumber = require('bignumber.js');
const NUM_ORDERS = parseInt(process.env.NUM_ORDERS || 5);
BigNumber.config({ ROUNDING_MODE: 1 }) // ROUND_DOWN

let BID_STORED_ORDERS = [];
let ASK_STORED_ORDERS = [];

const Orders = {
  getBids: () => BID_STORED_ORDERS,
  getAsks: () => ASK_STORED_ORDERS,
  cleanOrders: () => {
    BID_STORED_ORDERS = [];
    ASK_STORED_ORDERS = [];
  },
  newBid: (bids) => {
    const balance = Balance.get();
    const usdBalance = new BigNumber(balance.USD);
    if (usdBalance.isLessThanOrEqualTo('0')) {
      // NOT ENOUGH FOUNDS TO PLACE NEW BIDS ORDERS
      return;
    }

    const usdOrder = usdBalance.dividedBy(bids.length);

    bids.forEach(bid => {
      if (BID_STORED_ORDERS.length === NUM_ORDERS) return;
      const amount = usdOrder.dividedBy(bid.value).toFixed(18);
      const totalSpend = new BigNumber(amount).multipliedBy(bid.value).toFixed(5);
      BID_STORED_ORDERS.push({ price: bid.value, amount, totalPrice: totalSpend });
      console.info(`PLACE BID @ USD ${bid.value} ETH ${amount} `);
    });


  },
  newAsk: (asks) => {
    const balance = Balance.get();
    const ethBalance = new BigNumber(balance.ETH);
    if (ethBalance.isLessThanOrEqualTo('0')) {
      // NOT ENOUGH FOUNDS TO PLACE NEW ASK ORDERS 
      return;
    }

    const ethOrder = ethBalance.dividedBy(asks.length).toFixed(18);
    asks.forEach(ask => {
      if (ASK_STORED_ORDERS.length === NUM_ORDERS) return;
      const totalWin = new BigNumber(ethOrder).multipliedBy(ask.value).toFixed(5);
      ASK_STORED_ORDERS.push({ price: ask.value, amount: ethOrder, totalPrice: totalWin });
      console.log(`PLACE ASK @ USD ${ask.value} ETH ${ethOrder} `);
    });


  },
  check: (orders) => {
    const { bids, asks } = Calcs.splitBidAndAsk(orders);
    const bestBid = Calcs.bestBid(bids);
    const bestAsk = Calcs.bestAsk(asks);

    ASK_STORED_ORDERS = ASK_STORED_ORDERS.filter((stored) => {
      const balance = Balance.get();
      if (new BigNumber(stored.price).isLessThanOrEqualTo(bestAsk[0]) && (new BigNumber(balance.ETH)).isGreaterThanOrEqualTo(stored.amount)) {
        console.info(`FILLED ASK @ PRICE AMOUNT (ETH - ${stored.amount} USD + ${stored.price})
        `);
        const balance = Balance.get();
        Balance.update({
          ETH: new BigNumber(balance.ETH).minus(stored.amount).toFixed(18),
          USD: new BigNumber(balance.USD).plus(stored.totalPrice).toFixed(5)
        });
      }
      return;
    });

    BID_STORED_ORDERS = BID_STORED_ORDERS.filter((stored) => {
      const balance = Balance.get();
      if (new BigNumber(stored.price).isGreaterThanOrEqualTo(bestBid[0]) && (new BigNumber(balance.USD)).isGreaterThanOrEqualTo(stored.totalPrice)) {
        console.info(`FILLED BID @ PRICE AMOUNT (ETH + ${stored.amount} USD - ${stored.price})
        `);
        const balance = Balance.get();
        Balance.update({
          ETH: new BigNumber(balance.ETH).plus(stored.amount).toFixed(18),
          USD: new BigNumber(balance.USD).minus(stored.totalPrice).toFixed(5)
        });
      }
      return;
    });


  },
}

module.exports = Orders;