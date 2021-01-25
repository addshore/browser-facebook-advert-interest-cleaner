function log(message) {
  console.log( "fb-ad-interest-cleaner" + ": " + message );
}
function logAndDie(message) {
  log(message)
  throw new Error("fb-ad-interest-cleaner" + ": " + message);
}

module.exports = {
  log,
  logAndDie,
};