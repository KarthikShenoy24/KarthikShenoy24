/**
 * setInterval(callback,interval,arg1,arg2,...argN);
 */

//to make sere user does not update window.intervalId and window.intervals
const intervalsKey = Symbol();
const intervalIdTrackerKey = Symbol();

window[intervalIdTrackerKey] = 1000;
window[intervalsKey] = {};
window.setInterval = function (callback, interval, ...args) {
  const intervalId = window.intervalIDTracker++;
  function execute() {
    callback(...args);
    window.intervals[intervalId].interval += interval;
  }
  const timeToCall = Date.now() + interval;
  window.intervals[intervalId] = {
    callback: execute,
    interval: timeToCall,
    args,
  };
  //   processIntervals();
  // optimised call
  if (Object.keys(window.intervals).length === 1) {
    processIntervals();
  }

  return intervalId;
};

function processIntervals() {
  function exceuteIntervals(key) {
    const { callback, args, interval } = window.intervals[key];

    if (Date.now() >= interval) {
      callback(...args);
    } else {
      requestIdleCallback(processIntervals);
    }
  }
  Object.keys(window.intervals).forEach(exceuteIntervals);
}

window.clearInterval = function (id) {
  delete window.interval[id];
};
