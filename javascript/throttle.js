/*
    What is Throttling?
    Throttling is a technique used to limit the number of times a function (e.g., an API call) is executed 
    over time. It ensures that a function is called at most once in a specified time interval, no matter how 
    many times the event occurs.

    Example:
    Suppose we throttle an API call to allow only 1 call per 3 seconds.

    time -> 0-------1-------2-------3-------4-------5-------6-------7-------8-------9
    call -> a--b----c----------d----e--f--g----------------h--i---------------------j

    throttle call -> a----------------------d--------------------h--------------------

    Explanation:
    - At time 0: 'a' is called immediately.
    - 'b' and 'c' are ignored because they fall within 3 seconds after 'a'.
    - At time 3: 'd' is allowed.
    - 'e', 'f', and 'g' are ignored because they fall within 3 seconds after 'd'.
    - At time 6: 'h' is allowed.
    - 'i' and 'j' are ignored if they fall within 3 seconds after 'h'.

    Use Case:
    Useful for limiting API calls on events like scrolling, window resizing, or button clicking.
*/

//without throttle-------------------------------------------------------------------------------
function apiCall() {
  console.log("API Call at", new Date().toISOString());
}

// Simulate rapid calls every 500ms
setInterval(apiCall, 500);

/*
⚠️ Problem:
If this were a real API (like fetch('/api/sendEmail')), you’d be bombarding the server with calls every 500ms.
    This could:
        Trigger rate limits
        Overload the server
        Cause duplicate actions (e.g., sending 100 emails instead of 1)
*/
//--------------------------------------------------------------------------------------------------------------

//with throtling----------------------------------------------------------------------------------------------

/**
 * ✅ 1. Time-based Throttling
Ensures only one function call happens in a set interval (e.g., every 3 seconds).
 */
function throttleByTime(callback, interval) {
  const self = this;
  let lastCalled = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCalled > interval) {
      lastCalled = now;
      callback.apply(self, args);
    }
  };
}

const apiCall = () => {
  console.log("API Call at", new Date().toDateString());
};
const throlledApicall = throttleByTime(apiCall, 3000);

setInterval(throlledApicall, 500); // Only one call every 3 seconds

//-------------------------------------------------------------------------------------------------------

/**
 * ✅ 2. Count-based Throttling
Allows only one function call per N number of calls.
 */

function throttleByCount(callback, limit) {
  let callCount = 0;

  return function (...args) {
    const self = this;
    callCount++;
    if (callCount === limit) {
      callback.apply(self, args);
      callCount = 0; // Reset after allowed call
    }
  };
}

// Example usage:
const logEvent = () =>
  console.log("Throttled Call at", new Date().toISOString());
const countThrottledLog = throttleByCount(logEvent, 5); // Allow 1 call every 5 attempts

// Simulate 20 calls
for (let i = 1; i <= 20; i++) {
  countThrottledLog(); // Will log on 5th, 10th, 15th, 20th call
}
