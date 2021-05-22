function detectLanguageData() {
  return document.getElementsByTagName('html')[0].innerHTML.match(/"(language|code)":"([^"]+)"}/i);
}

function detectLanguageCode() {
  return detectLanguageData()[2];
}

module.exports = {
  detectLanguageCode
};