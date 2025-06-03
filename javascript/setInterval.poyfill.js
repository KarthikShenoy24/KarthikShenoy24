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
      /**
       * The window.requestIdleCallback() method queues a function to be called during a browser's idle periods.
       * This enables developers to perform background and low priority work on the main event loop,
       * without impacting latency-critical events such as animation and input response.
       * Functions are generally called in first-in-first-out order; however,
       * callbacks which have a timeout specified may be called out-of-order if necessary in order to run them
       * before the timeout elapses.
       * You can call requestIdleCallback() within an idle callback function to schedule another callback to take
       * place no sooner than the next pass through the event loop.
       */
    }
  }
  Object.keys(window.intervals).forEach(exceuteIntervals);
}

window.clearInterval = function (id) {
  delete window.interval[id];
};
