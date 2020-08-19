const Cron = require('./Cron');
test('shoud execute a function', () => {
  const cron = Cron(() => {
    cron.cancel();
    expect(true).toBe(true);
  }, 100);

});
