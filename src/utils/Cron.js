const Cron = (job, time) => {
  setTimeout(async () => {
    await job();
    setTimeout(job, time);
  }, time);
}

module.export = Cron;