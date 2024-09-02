// ==UserScript==
// @name         anti-anti-inspect
// @description  Certain websites prevent inspection and viewing source content. This script bypasses it.
// @version      1.0
// @description  Bypass scripts that disable right-click and keyboard shortcuts
// @author       asrvn
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    // Enable right-click
    document.oncontextmenu = null;

    // Remove any onkeydown event listener set on the document
    document.onkeydown = null;

    // Alternatively, to ensure all event listeners are removed:
    window.addEventListener('load', function() {

        document.body.removeEventListener('contextmenu', document.oncontextmenu);
        document.body.removeEventListener('keydown', document.onkeydown);

    }, true);

    // For modern browsers, using removeEventListener is more reliable
    window.addEventListener('keydown', function(event) {

        event.stopPropagation();

    }, true);

    window.addEventListener('contextmenu', function(event) {

        event.stopPropagation();

    }, true);

})();
