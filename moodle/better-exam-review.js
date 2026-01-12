// ==UserScript==
// @name        Better Moodle exam review
// @namespace   raulmart.in
// @match       *://*/moodle/mod/quiz/report.php*
// @grant       none
// @version     1.0
// @author      Raúl Martín
// @description Last updated 3/8/2020, 8:42:28 PM
// @run-at		document-end
// @downloadURL https://raw.githubusercontent.com/rmartinsanta/userscripts/main/moodle/better-exam-review.js
// ==/UserScript==

PREFER_TABS = true

VIEW_URL = "mod/quiz/reviewquestion.php"
EDIT_URL = "mod/quiz/comment.php"


function fixLink(node) {
    node.href = node.href.replace(VIEW_URL, EDIT_URL);
}

// replace all links in results page
document.querySelectorAll(`a[href*='${VIEW_URL}']`).forEach(fixLink);

// YUI registers hundreds of event handlers to open shitty windows. 
// Intercept calls to openpopup, check if arg is reviewquestion.php, and replace it. 
const originalOpenPopup = window.openpopup;
window.openpopup = function(e, args) {
        if (args.url.indexOf(VIEW_URL) >= 0) {
			const url = args.url.replace(VIEW_URL, EDIT_URL);
			if (PREFER_TABS){
				if(e.preventDefault) e.preventDefault();
				return window.open(url, "_blank");
			}
        } 
	return originalOpenPopup(e, args);
};
