const xpath = require("./lib/xpath.js")
const console = require("./lib/console.js")
const nav = require("./lib/nav.js")
const fb = require("./lib/fb.js")
const app = require("./lib/app.js")
const languageCode = fb.detectLanguageCode()

//Note: If new chars appear here as caps, they may need to be added to the xpath.translateWrap method
var languageMap = {
  "en_US" : {
    langMapHeading: "Interest Categories",
    langMapAllButton: "See All Interests",
    langMapRemoveButton: "Remove",
  },
  "en_GB" : {
    langMapHeading: "Interest Categories",
    langMapAllButton: "See All Interests",
    langMapRemoveButton: "Remove",
  },
  "de_DE" : {
    langMapHeading: "Interessen",
    langMapAllButton: "Alle Interessen ansehen",
    langMapRemoveButton: "Entfernen",
  },
  "fr_FR" : {
    langMapHeading: "Catégories de centres d’intérêt",
    langMapAllButton: "Voir tous les centres d’intérêt",
    langMapRemoveButton: "Supprimer",
  },
  "pt_BR" : {
    langMapHeading: "Categorias de interesse",
    langMapAllButton: "Ver todos os interesses",
    langMapRemoveButton: "Remover",
  },
  "pt_PT" : {
    langMapHeading: "Categorias de interesses",
    langMapAllButton: "Ver todos os interesses",
    langMapRemoveButton: "Remover",
  },
  "tr_TR" : {
    langMapHeading: "İlgi Alanı Kategorileri",
    langMapAllButton: "Tüm İlgi Alanlarını Gör",
    langMapRemoveButton: "Kaldır",
  },
}

// Decide if this app can run or not based on the language being used
if(!(languageCode in languageMap)){
  console.logAndDie( "Can not run on page with language: " + languageCode );
}
console.log( "Running with language: " + languageCode );

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
  "faicAdPrefsAdSettingsCategoriesInterests",
  function( idForInjection, boxElement, headingElement ) {
    app.addUI(
      idForInjection,
      headingElement,
      "Advert Interest Cleaner (04 July 2023)",
      "Remove all interests",
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