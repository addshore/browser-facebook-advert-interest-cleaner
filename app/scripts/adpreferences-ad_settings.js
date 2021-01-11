var languageDetection = document.getElementsByTagName('html')[0].innerHTML.match('{"locale":"([^"]+)","language":"([^"]+)"}');
var languageCode = languageDetection[1];
var languageName = languageDetection[2];

var injectedHtmlId = "wpdtFbInterestsArea"
var waitBetweenClicks = 200

const langMapHeading = 'langMapHeading';
const langMapRemoveButton = 'langMapRemoveButton';
const langMapAllInterestsButton = 'langMapAllInterestsButton';
var languageMap = {
  "en_US" : {
    langMapHeading: "Interest Categories",
    langMapAllInterestsButton: "See All Interests",
    langMapRemoveButton: "Remove",
  },
  "en_GB" : {
    langMapHeading: "Interest Categories",
    langMapAllInterestsButton: "See All Interests",
    langMapRemoveButton: "Remove",
  },
  "de_DE" : {
    langMapHeading: "Interessen",
    langMapAllInterestsButton: "Alle Interessen ansehen",
    langMapRemoveButton: "Entfernen",
  },
  "fr_FR" : {
    langMapHeading: "Catégories de centres d’intérêt",
    langMapAllInterestsButton: "Voir tous les centres d’intérêt",
    langMapRemoveButton: "Supprimer",
  },
  "pt_BR" : {
    langMapHeading: "Categorias de interesse",
    langMapAllInterestsButton: "Ver todos os interesses",
    langMapRemoveButton: "Remover",
  },
  "pt_PT" : {
    langMapHeading: "Categorias de interesses",
    langMapAllInterestsButton: "Ver todos os interesses",
    langMapRemoveButton: "Remover",
  },
  "tr_TR" : {
    langMapHeading: "İlgi Alanı Kategorileri",
    langMapAllInterestsButton: "Tüm İlgi Alanlarını Gör",
    langMapRemoveButton: "Kaldır",
  },
}

function consoleLog(someOutput) {
  console.log( "facebook-adspreferences-add_settings: " + someOutput );
}
function consoleLogAndDie(someOutput) {
  consoleLog(someOutput)
  throw new Error(someOutput);
}

// Bail if running on a page that has an unknown language
if(!(languageCode in languageMap)){
  consoleLogAndDie( "Can not run on page with language: " + languageName + " ("+languageCode+")" );
}
consoleLog( "Running with language: " + languageName + " ("+languageCode+")" );

// Calculate some xpaths to use
var xpathForInterestsBoxHeading = "(//span[text() = '"+languageMap[languageCode][langMapHeading]+"'])[2]"
var xpathForInterestsBox = xpathForInterestsBoxHeading + "/../../../.."
var xpathInBoxForSeeAllInterestsButton = "//span[text() = '"+languageMap[languageCode][langMapAllInterestsButton]+"']"
var xpathInBoxForRemoveButton = "//span[text() = '"+languageMap[languageCode][langMapRemoveButton]+"']"

// Try to setup our UI bit every second
// This is needed as the elements we detect will not appear in the DOM until they are navigated to
setInterval(tryInit, 500);
consoleLog( "Waiting to find UI element to attach to..." );
consoleLog( "Using XPATH: " + xpathForInterestsBox );
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
      var seeAll = document.evaluate(xpathInBoxForSeeAllInterestsButton,boxElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if(!seeAll){
        consoleLog("Failed to find 'See All Interests' button");
        return
      }
      consoleLog("Clicking a 'See All Interests' button to expand the list")
      await scrollClickAndWait(seeAll, waitBetweenClicks);
    }

    async function clickAllRemoveButtonsOnCurrentPage() {
      let allRemoveButtons = document.evaluate(xpathInBoxForRemoveButton,boxElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      consoleLog("Clicking on " + allRemoveButtons.snapshotLength + " 'Remove' buttons")
      for (let i=0; i<allRemoveButtons.snapshotLength; i++) {
        await scrollClickAndWait(allRemoveButtons.snapshotItem(i), waitBetweenClicks);
      }
    }

    // Do the deeds
    await clickSeeAllInterestsButton();
    await clickAllRemoveButtonsOnCurrentPage();
    console.log("All done!")

    // Scroll back to the top (incase we ended up somewhere odd)
    window.scrollTo(0,0);

  }, false);

}