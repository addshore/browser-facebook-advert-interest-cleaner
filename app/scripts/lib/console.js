function log(someOutput) {
  console.log( "facebook-adspreferences-add_settings: " + someOutput );
}
function logAndDie(someOutput) {
  log(someOutput)
  throw new Error(someOutput);
}

module.exports = { log, logAndDie };