function detectLanguageData() {
  return document.getElementsByTagName('html')[0].innerHTML.match('{"locale":"([^"]+)","language":"([^"]+)"}');
}

function detectLanguageCode() {
  return detectLanguageData()[1];
}

function detectLanguageName() {
  return detectLanguageData()[2];
}

module.exports = {
  detectLanguageCode,
  detectLanguageName
};