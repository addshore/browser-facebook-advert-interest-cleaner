const console = require("./console.js")

function setup(xpathToWaitFor,xpathToInjectAfter,idForInjection,runWhenFound){
  setInterval(tryInit, 500);
  console.log( "Waiting to find UI element to attach to with xpath: " + xpathToWaitFor );
  function tryInit( )
  {
    var elementWaitedFor = document.evaluate(xpathToWaitFor,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var injectedArea = document.getElementById(idForInjection);
    if(elementWaitedFor && !injectedArea){
      console.log( "Found element to attach UI to. Attaching..." );
      runWhenFound(
        idForInjection,
        elementWaitedFor,
        document.evaluate(xpathToInjectAfter,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        );
    }
  }
}

function addUI(idForInjection, injectAfter, text, buttonText, onClickAsync){
  // Inject an element to put our UI in
  injectAfter.insertAdjacentHTML('afterend', '<div id="' + idForInjection + '" class="faicArea"></div>');
  var myArea = document.getElementById(idForInjection);
  // Text body
  var preButtonText = document.createElement('span');
  preButtonText.innerHTML = "<strong>"+text+"</strong>: "
  myArea.append(preButtonText)
  // Button
  var button = document.createElement("input");
  button.id = idForInjection+"Button"
  button.type = "button"
  button.value = buttonText
  button.addEventListener("click", onClickAsync, false);
  myArea.append(button)
}

module.exports = {
  setup,
  addUI
};