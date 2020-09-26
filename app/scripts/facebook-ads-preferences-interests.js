console.log("Running addon script")

var interestsElement = document.getElementById('interests');
if(interestsElement){
  init( interestsElement );
}

function init( element ) {

var injectHtml = '<div id="wpdtFbInterestsArea" class="wpdtArea"></div>';
element.insertAdjacentHTML('beforebegin', injectHtml);
var area = document.getElementById("wpdtFbInterestsArea");

var preButtonText = document.createElement('span');
preButtonText.innerHTML = "<strong>Facebook Advert Interest Cleaner. v1.0.6</strong>: "
area.append(preButtonText)

var button = document.createElement("input");
button.id = "wpdtClearInterests"
button.type = "button"
button.value = "Remove all interests from visible interest tabs"
area.append(button)

var postButtonText = document.createElement('span');
postButtonText.innerHTML = "<p>If your list of interests has a 'More' tab you may need to reload the page and click me multiple times.</p>"
area.append(postButtonText)

button.addEventListener("click", async function() {
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

	async function clickAllSeeMoreLinksOnCurrentPage() {
		let moreSeeMoreLinks = true
		while(moreSeeMoreLinks === true) {
			var seeMore = document.evaluate(
				xpathPrepare("//div[@id='interests'][1]//div//text()[translate(., '$u', '$l')='$s']/..", "See more"),
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
			).singleNodeValue;
			if(seeMore) {
				console.log("Clicking a 'See more' link to expand the page")
				await scrollClickAndWait(seeMore, 200);
			} else {
				moreSeeMoreLinks = false
			}
		}
	}

	async function clickAllRemoveButtonsOnCurrentPage() {
		let allRemoveButtons = document.evaluate(
			xpathPrepare("//div[@id='interests'][1]//button/@data-tooltip-content[translate(., '$u', '$l')='$s']/..", "Remove"),
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
		);
		console.log("Clicking on " + allRemoveButtons.snapshotLength + " 'Remove' buttons")
		for (let i=0; i<allRemoveButtons.snapshotLength; i++) {
			await scrollClickAndWait(allRemoveButtons.snapshotItem(i), 200);
		}
	}

	async function removeAllInterestsForAllClickableTabs() {
		let allVisibleInterestTabs = document.evaluate(
			"//div[@id='interests'][1]//ul[@role='tablist'][1]//li[@role='presentation']/a",
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
		);
		console.log("Clicking on " + allVisibleInterestTabs.snapshotLength + " 'Interest' tabs")
		for (let i=0; i<allVisibleInterestTabs.snapshotLength; i++) {
			console.log(allVisibleInterestTabs.snapshotItem(i))
			await scrollClickAndWait( allVisibleInterestTabs.snapshotItem(i), 200 )
			await clickAllSeeMoreLinksOnCurrentPage()
			await clickAllRemoveButtonsOnCurrentPage()
		}
	}

	await removeAllInterestsForAllClickableTabs();
	console.log("All done!")

	window.scrollTo(0,0);

}, false);

}