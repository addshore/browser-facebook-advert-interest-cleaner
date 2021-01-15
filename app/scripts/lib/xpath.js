/**
 * Wraps a RAW xpath value in a translate to make it lower case.
 * Note: if the value is meant to be a string it should be quoted
 * @param {String} value 
 */
function translateWrap(value) {
  return "translate(" + value + ",'ABCDEFGHIJKLMNOPQRSTUVWXYZİ','abcdefghijklmnopqrstuvwxyzi')"
}

function translateWrapString(string) {
  return translateWrap("'"+string+"'")
}

function ofTagWithText(tag, text) {
  return "//"+tag+"[" + translateWrap("text()") + " = " + translateWrapString(text) + "]"

}

module.exports = {
  translateWrap,
  translateWrapString,
  ofTagWithText
};