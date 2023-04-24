// Create a new worker
const worker = new Worker('worker.js');

// Send a message to the worker
worker.postMessage({ type: 'start', data: [1, 2, 3, 4, 5] });

// Receive a message from the worker
worker.onmessage = function(event) {
  const { type, data } = event.data;

  if (type === 'result') {
    console.log(`The result is ${data}`);
  }
};

// Close the worker when done
worker.terminate();
