const CheckBalance = require('./jobs/CheckBalances');
const CheckMarket = require('./jobs/CheckMarket');
const Cron = require('./utils/Cron');
const BestBidBestAsk = require('./strategies/BestBidBestAsk');
// Times
const ORDER_PRICE = 5000; // 5s
const CHECK_BALANCE = 30000; // 30s

const App = {
  start: () => {
    console.log(' -- Start Crons --');
    let cronMarket, cronBalance;
    try {
      cronBalance = Cron(CheckBalance.run, CHECK_BALANCE);
      cronMarket = Cron(CheckMarket.run([BestBidBestAsk]), ORDER_PRICE);
    } catch (error) {
      console.error('Unknown error ', error);
      // In case of error we stop the trading system to avoid lose money
      cronBalance.cancel();
      cronMarket.cancel();
    }
  }
};





App.start();