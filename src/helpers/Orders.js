
const Calcs = require('./Calcs');
const Balance = require('./Balance');
const BigNumber = require('bignumber.js');
BigNumber.config({ ROUNDING_MODE: 1 }) // ROUND_DOWN

let BID_STORED_ORDERS = [];
let ASK_STORED_ORDERS = [];

const Orders = {
  newBid: (bids) => {
    const balance = Balance.get();
    const usdBalance = new BigNumber(balance.USD);
    if (usdBalance.isLessThanOrEqualTo('0')) {
      // NOT ENOUGH FOUNDS TO PLACE NEW BIDS ORDERS
      return;
    }

    const usdOrder = usdBalance.dividedBy(bids.length);
    let discard = '0';
    bids.forEach(bid => {
      const amount = usdOrder.dividedBy(bid.value).toFixed(5);
      BID_STORED_ORDERS.push({ price: bid.value, amount });
      const totalSpend = new BigNumber(amount).multipliedBy(bid.value);
      discard = new BigNumber(discard).plus(usdOrder.minus(totalSpend));
      console.info(`PLACE BID @ ${bid.value} ${amount} `);
    });

    Balance.update({
      ETH: balance.ETH,
      USD: discard.toFixed(5)
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
      ASK_STORED_ORDERS.push({ price: ask.value, amount: ethOrder });
      console.log(`PLACE ASK @ ${ask.value} ${ethOrder} `);
    });

    Balance.update({
      ETH: ethBalance.minus(new BigNumber(ethOrder).multipliedBy(asks.length).toFixed(18)),
      USD: balance.USD
    });
  },
  check: (orders) => {
    const { bids, asks } = Calcs.splitBidAndAsk(orders);
    const bestBid = Calcs.bestBid(bids);
    const bestAsk = Calcs.bestAsk(asks);

    BID_STORED_ORDERS = BID_STORED_ORDERS.filter((stored) => {
      if (new BigNumber(stored.price).isGreaterThanOrEqualTo(bestBid[0])) {
        console.info(`FILLED BID @ PRICE AMOUNT (ETH - ${stored.amount} USD + ${stored.price})
        `)
        return;
      } else {
        return stored;
      }
    });

    ASK_STORED_ORDERS = ASK_STORED_ORDERS.filter((stored) => {
      if (new BigNumber(stored.price).isGreaterThanOrEqualTo(bestAsk[0])) {
        console.info(`FILLED ASK @ PRICE AMOUNT (ETH + ${stored.amount} USD - ${stored.price})
        `)
        return;
      } else {
        return stored;
      }
    });
  },
}

module.exports = Orders;