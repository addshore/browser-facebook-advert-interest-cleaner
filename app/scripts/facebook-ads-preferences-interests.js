var xpathForInterestsBoxHeading = "(//span[text() = 'Interest Categories'])[2]"
var xpathForInterestsBox = xpathForInterestsBoxHeading + "/../../../.."

var injectedHtmlId = "wpdtFbInterestsArea"
var waitBetweenClicks = 200

var xpathForSeeAllInterestsButton = "//span[text() = 'See All Interests']"
var xpathForRemoveButton = "//span[text() = 'Remove']"

function consoleLog(someOutput) {
  console.log( "facebook-ads-preferences-interests: " + someOutput );
}
consoleLog( "Running" );

// Try to setup our UI bit every second
// This is needed as the elements we detect will not appear in the DOM until they are navigated to
setInterval(tryInit, 500);
function tryInit( )
{
  var interestsBox = document.evaluate(xpathForInterestsBox,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var injectedArea = document.getElementById(injectedHtmlId);
  if(interestsBox && !injectedArea){
    consoleLog( "Found element to attach UI to" );
    var interestsHeading = document.evaluate(xpathForInterestsBoxHeading,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    init( interestsBox, interestsHeading );
  }
}

function xpathPrepare(xpath, searchString) {
  return xpath.replace("$u", searchString.toUpperCase())
    .replace("$l", searchString.toLowerCase())
    .replace("$s", searchString.toLowerCase());
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function scrollClickAndWait( element, ms) {
  element.scrollIntoView(false);
  element.click();
  await sleep(ms)
}

// Called once the box element is found
function init( boxElement, headingElement ) {

  // Inject a DOM element that we will add our UI to
  var injectHtml = '<div id="' + injectedHtmlId + '" class="wpdtArea"></div>';
  headingElement.insertAdjacentHTML('afterend', injectHtml);
  var area = document.getElementById(injectedHtmlId);

  // Add the custom UI elements
  // text body
  var preButtonText = document.createElement('span');
  preButtonText.innerHTML = "<strong>Facebook Advert Interest Cleaner (11 Jan 2021)</strong>: "
  area.append(preButtonText)
  // button
  var button = document.createElement("input");
  button.id = "wpdtClearInterests"
  button.type = "button"
  button.value = "Remove all interests"
  area.append(button)

  // When the button is clicked
  button.addEventListener("click", async function() {

    async function clickSeeAllInterestsButton() {
      var seeAll = document.evaluate(xpathForSeeAllInterestsButton,boxElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if(!seeAll){
        consoleLog("Failed to find 'See All Interests' button");
      }
      consoleLog("Clicking a 'See All Interests' button to expand the list")
      await scrollClickAndWait(seeAll, waitBetweenClicks);
    }

    async function clickAllRemoveButtonsOnCurrentPage() {
      let allRemoveButtons = document.evaluate(xpathForRemoveButton,boxElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      consoleLog("Clicking on " + allRemoveButtons.snapshotLength + " 'Remove' buttons")
      for (let i=0; i<allRemoveButtons.snapshotLength; i++) {
        await scrollClickAndWait(allRemoveButtons.snapshotItem(i), waitBetweenClicks);
      }
    }

    // Do the deeds
    await clickSeeAllInterestsButton();
    await clickAllRemoveButtonsOnCurrentPage();
    await removeAllInterestsForAllClickableTabs();
    console.log("All done!")

    // Scroll back to the top (incase we ended up somewhere odd)
    window.scrollTo(0,0);

  }, false);

}