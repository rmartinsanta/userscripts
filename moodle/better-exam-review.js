// ==UserScript==
// @name        Better Moodle exam review
// @namespace   raulmart.in
// @match       *://*/moodle/mod/quiz/*
// @grant       none
// @version     1.1
// @author      Raúl Martín
// @description Fix light-dark mode text editors, improve UI when grading 
// @run-at		document-end
// @downloadURL https://raw.githubusercontent.com/rmartinsanta/userscripts/main/moodle/better-exam-review.js
// ==/UserScript==

PREFER_TABS = true

VIEW_URL = "mod/quiz/reviewquestion.php"
EDIT_URL = "mod/quiz/comment.php"

const FIX_DARK_LIGHT_MODE = `
.answer div.qtype_essay_response {
	background-color: white !important;
}

.answer div.qtype_essay_response, body.urjc-darkmode .answer div.qtype_essay_response span, body.urjc-darkmode .answer div.qtype_essay_response p, body.urjc-darkmode .answer div.qtype_essay_response div {
	color: black !important;
}


body.urjc-darkmode .answer div.qtype_essay_response {
	background-color: black !important;
}

body.urjc-darkmode .answer div.qtype_essay_response, body.urjc-darkmode .answer div.qtype_essay_response span, body.urjc-darkmode .answer div.qtype_essay_response p, body.urjc-darkmode .answer div.qtype_essay_response div {
	color: white !important;
}
`

function addCSS(css){
	const styleSheet = document.createElement("style");
	styleSheet.textContent = css;
	document.head.appendChild(styleSheet);
}

function fixLink(node) {
    node.href = node.href.replace(VIEW_URL, EDIT_URL);
}

addCSS(FIX_DARK_LIGHT_MODE);

if (window.location.href.indexOf("moodle/mod/quiz/report.php") > 0){
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
}
