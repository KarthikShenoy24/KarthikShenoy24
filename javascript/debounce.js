/*
    what is debounce?
    we use debounce to manage a event which is occuring way faater then the browser or we as frontend develoer can handle.

    by debouncing we enfor 2 restrictions
    1. between 1st and next function call there is certain delay.
    2. if the next function call happens before the delay interval is complete previous call is cancelled
        and next function has to again wait for the duration
*/

//Example problem------------------------------------------------
// Here api call is made for every change in search text which will cause unnecessary calls before complete full search term
function handleInput(event) {
  const value = e.target.value;
  console.log("value", value);

  const searchTermDom = document.getElementById("search");
  searchTermDom.innerText = value;
  makeApiCall(value);
}

function makeApiCall(data) {
  console.log("fetching data for ", data);
}
//----------------------------------------------------------------

//Solution using debounce-----------------------------------------
function debounce(callback, delay) {
  let self = this;
  let timeout;
  return function (...args) {
    clearTimeout(timeout); //cancel previous call stored in timeout
    timeout = setTimeout(function () {
      callback.apply(self, args);
    }, delay);
  };
}

const debouncedApiCall = debounce(makeApiCall, 1000);

function handleInput(event) {
  const value = e.target.value;
  console.log("value", value);

  const searchTermDom = document.getElementById("search");
  searchTermDom.innerText = value;
  debouncedApiCall(value);
}

function makeApiCall(data) {
  console.log("fetching data for ", data);
}
//-----------------------------------------------------------------
//dont debounce everything only debounce low priority task
