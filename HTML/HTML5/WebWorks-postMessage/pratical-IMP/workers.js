// worker.js

// Define a function that performs the heavy calculation
function performCalculation(data) {
    // Perform the heavy calculation
    // ...
    return result;
  }
  
  // Listen for messages from the main thread
  self.addEventListener('message', function(event) {
    // Get the data from the message
    var data = event.data;
  
    // Call the function to perform the calculation
    var result = performCalculation(data);
  
    // Send the result back to the main thread
    self.postMessage(result);
  });
  