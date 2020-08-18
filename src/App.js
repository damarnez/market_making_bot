const CheckBalance = require('./jobs/CheckBalances');
const CheckMarket = require('./jobs/CheckMarket');
const Cron = require('./utils/Cron');

// Times
const ORDER_PRICE = 5000; // 5s
const CHECK_BALANCE = 30000; // 30s

const App = {
  start: () => {
    console.log(' -- Start Crons --');
    Cron(CheckBalance.run, CHECK_BALANCE);
    Cron(CheckMarket.run, ORDER_PRICE);
  }
};





App.start();