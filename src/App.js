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
    try {
      Cron(CheckBalance.run, CHECK_BALANCE);
      Cron(CheckMarket.run([BestBidBestAsk]), ORDER_PRICE);
    } catch (error) {
      console.error('Unknown error ', error);
    }
  }
};





App.start();