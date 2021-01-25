const xpath = require("./lib/xpath.js")
const console = require("./lib/console.js")
const nav = require("./lib/nav.js")
const fb = require("./lib/fb.js")
const app = require("./lib/app.js")
const languageCode = fb.detectLanguageCode()
const languageName = fb.detectLanguageName()

//Note: If new chars appear here as caps, they may need to be added to the xpath.translateWrap method
var languageMap = {
  "en_US" : {
    langMapHeading: "Other Categories",
    langMapAllButton: "See All Categories",
    langMapRemoveButton: "Remove",
  },
  "en_GB" : {
    langMapHeading: "Other categories",
    langMapAllButton: "See All Categories",
    langMapRemoveButton: "Remove",
  }
}

// Decide if this app can run or not based on the language being used
if(!(languageCode in languageMap)){
  console.logAndDie( "Can not run on page with language: " + languageName + " ("+languageCode+")" );
}
console.log( "Running with language: " + languageName + " ("+languageCode+")" );

// Global xpaths (whole document)
var boxHeading = "("+xpath.ofTagWithText("span",languageMap[languageCode].langMapHeading)+")[2]"
var box = boxHeading + "/../../../.."
// Selection xpaths (only in the element selected)
var seeAllButton = xpath.ofTagWithText("span",languageMap[languageCode].langMapAllButton)
var removeButton = xpath.ofTagWithText("span",languageMap[languageCode].langMapRemoveButton)
// Setup the app
app.setup(
  box,
  boxHeading,
  "faicAdPrefsAdSettingsCategoriesOther",
  function( idForInjection, boxElement, headingElement ) {
    app.addUI(
      idForInjection,
      headingElement,
      "Facebook Advert Category Cleaner (25 Jan 2021)",
      "Remove all categories",
      async function() {
        await nav.clickMatchingXpathInElement(seeAllButton,boxElement);
        await nav.sleep(500); // Try and wait for the DOM to update (Issue #5)
        await nav.clickAllMatchingXpathInElement(removeButton,boxElement);
        await nav.clickAllMatchingXpathInElement(removeButton,boxElement); // Make sure that we clicked all the buttons (Issue #5)
        nav.scrollToTop()
        console.log("All done!")
      }
    )
  }
)