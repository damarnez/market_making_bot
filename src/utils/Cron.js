const Cron = (job, time) => {
  let loopId = 0;
  let stop = false;

  const loop = async () => {
    await job();
    if (!stop) loopId = setTimeout(loop, time);
  };

  const cancel = () => {
    stop = true;
    clearTimeout(loopId);
  }

  loopId = setTimeout(loop, time);
  return { cancel };
}

module.exports = Cron;