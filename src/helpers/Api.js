const Axios = require('axios');
const CustomError = require('../utils/CustomError');
const params = {
  Symbol: "tETHUSD",
  Precision: "P0",
};

const Api = {
  Orderbook: async () => {
    const url = `https://api.stg.deversifi.com/bfx/v2/book/${params.Symbol}/${params.Precision}`;
    const response = await Axios(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    switch (response.status) {
      case 200:
        return response.data;
      case 400:
        throw new CustomError('API', `Bad params in orderbook api ${response.status}`);
      default:
        throw new CustomError('API', `Unkown error in orderbook api ${response.status}`);
    }
  }
};




module.exports = Api;

