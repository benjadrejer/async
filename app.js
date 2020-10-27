// node script demonstrating promises and async/await
const axios = require('axios');

// ----Promises------

/* Regular axios fetch promise */
const axiosGet = () => {
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
      console.log('response: ', res.data);
    })
    .catch((err) => {
      console.log('error: ', err.response.statusText);
    });
};

axiosGet();



/* Manual promise to handle async code */

// 1. Create an executor function which takes 2 parameters: resolve & reject
const promiseExecutor = (resolve, reject) => {
  console.log('promise pending ....');
  // Do logic and decide whether to resolve or reject the promise
  const decision = true;
  setTimeout(() => {
    if (decision) {
      resolve(() => 25);
    } else {
      reject({ message: 'Promise rejected!' });
    }
  }, 3000)
};

// 2. Create a promise passing the executor function
const pro = new Promise(promiseExecutor);
console.log('promise: ', pro);

// 3. handle the promise success & fail cases with .then and .catch
pro
  .then(res => console.log('promise resolve: ', res()))
  .catch(err => console.log('caught: ', err.message));




/* Async await syntax */
const asyncFetch = async () => {
  console.log('async fetching...');
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log('response: ', res.data);
  } catch(err) {
    console.log('error: ', err.response.statusText);
  }
}

asyncFetch();




/* Promise.all */
const promiseExecutorFail = (resolve, reject) => {
  console.log('promise pending ....');
  // Do logic and decide whether to resolve or reject the promise
  const decision = false;
  setTimeout(() => {
    if (decision) {
      resolve(() => 25);
    } else {
      reject({ message: 'Promise rejected!' });
    }
  }, 3000)
};


const pro1 = new Promise(promiseExecutor);
const pro2 = new Promise(promiseExecutorFail);
Promise.all([pro1, pro2])
  .then((arr) => arr.forEach(res => console.log(res())))
  .catch((err) => console.log('fail: ', err));