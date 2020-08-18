const Api = require('../helpers/Api');

const CheckOrderBook = {

  run: (strategies) => async () => {
    try {
      const orders = await Api.Orderbook();
      const promises = strategies.map((stra) => stra.run(orders));

      Promise.all(promises);
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