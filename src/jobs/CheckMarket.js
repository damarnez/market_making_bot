const Api = require('../helpers/Api');

const CheckOrderBook = {

  run: async () => {
    const response = await Api.Orderbook();
    console.log(' CHECK MARKET ', response)
  }
};


module.exports = CheckOrderBook;