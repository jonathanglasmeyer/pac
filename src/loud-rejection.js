/* eslint-disable */
window.onload = function() {
  process.on('unhandledRejection', (err, p) => {
      console.log("Unhandled Rejection at: Promise ", p, " err: ", err);
      console.error(err.stack || err);
  });
}
