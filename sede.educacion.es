// ==UserScript==
// @name        unblocker
// @namespace   raulmart.in
// @match       https://sede.educacion.gob.es/*
// @grant       none
// @version     1.0.1
// @author      Raul Martin
// @description Disable sEcUrItY MeAsUrEs
// @downloadURL https://raw.githubusercontent.com/rmartinsanta/userscripts/main/sede.educacion.es/unblocker.js
// ==/UserScript==

const uWin = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
if (!(uWin instanceof Window)) return;

uWin.oncontextmenu = function(){return true;}

uWin.onselectstart = function(){return true;}

uWin.onpaste = function(){return true;}
