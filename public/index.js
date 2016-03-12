var fs = require('fs');
var path = require('path');

window.onload = function() {
  try {
    process.on('unhandledRejection', function(error, promise) {
      console.error('Unhandled promise rejection %o with error: %o', promise, error);
    });

  } catch (error) {
    console.error(error.stack || error);
  }
}
