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

// Decide if this app can run or not based on the language being used
if(!(languageCode in languageMap)){
  console.logAndDie( "Can not run on page with language: " + languageName + " ("+languageCode+")" );
}
console.log( "Running with language: " + languageName + " ("+languageCode+")" );

// Global xpaths (whole document)
var interestsBoxHeading = "("+xpath.ofTagWithText("span",languageMap[languageCode].langMapHeading)+")[2]"
var interestsBox = interestsBoxHeading + "/../../../.."
// Selection xpaths (only in the element selected)
var seeAllInterestsButton = xpath.ofTagWithText("span",languageMap[languageCode].langMapAllInterestsButton)
var removeButton = xpath.ofTagWithText("span",languageMap[languageCode].langMapRemoveButton)
// Setup the app
app.setup(
  interestsBox,
  interestsBoxHeading,
  "faicAdPrefsAdSettingsCategoriesInterests",
  function( idForInjection, boxElement, headingElement ) {
    app.addUI(
      idForInjection,
      headingElement,
      "Facebook Advert Interest Cleaner (15 Jan 2021)",
      "Remove all interests",
      async function() {
        await nav.clickMatchingXpathInElement(seeAllInterestsButton,boxElement);
        await nav.sleep(500); // Try and wait for the DOM to update (Issue #5)
        await nav.clickAllMatchingXpathInElement(removeButton,boxElement);
        await nav.clickAllMatchingXpathInElement(removeButton,boxElement); // Make sure that we clicked all the buttons (Issue #5)
        nav.scrollToTop()
        console.log("All done!")
      }
    )
  }
)