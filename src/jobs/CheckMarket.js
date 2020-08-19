const Api = require('../helpers/Api');
const Orders = require('../helpers/Orders');
const CheckOrderBook = {

  run: (strategies) => async () => {
    try {
      const orders = await Api.Orderbook();
      Orders.check(orders);
      const promises = strategies.map((stra) => stra.run(orders));
      const newOrdersByStrategy = await Promise.all(promises);
      newOrdersByStrategy.forEach(newOrders => {
        Orders.newAsk(newOrders.asks);
        Orders.newBid(newOrders.bids);
      });
    } catch (error) {
      if (error.tag) {
        // Controled error
        console.error(error);
      } else {
        // Unknow error
        throw error;
      }

    }
  }
};

module.exports = CheckOrderBook;