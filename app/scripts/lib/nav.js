const console = require("./console.js")

const waitBetweenClicks = 200

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollClickAndWait( element, ms) {
  element.scrollIntoView(false);
  element.click();
  await sleep(ms)
}

function scrollToTop() {
  window.scrollTo(0,0);
}

async function clickMatchingXpathInElement(xpath, element) {
  var thing = document.evaluate(xpath,element, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if(!thing){
    console.log("Failed to find thing to click with xpath: " + xpath);
    return
  }
  console.log("Clicking on 1 thing")
  await scrollClickAndWait(thing, waitBetweenClicks);
}

async function clickAllMatchingXpathInElement(xpath, element) {
  let allThings = document.evaluate(xpath,element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  console.log("Clicking on " + allThings.snapshotLength + " things")
  for (let i=0; i<allThings.snapshotLength; i++) {
    await scrollClickAndWait(allThings.snapshotItem(i), waitBetweenClicks);
  }
}

module.exports = {
  scrollClickAndWait,
  scrollToTop,
  clickAllMatchingXpathInElement,
  clickMatchingXpathInElement
};