// ==UserScript==
// @name         anti-anti-inspect
// @namespace    https://github.com/asrvn/anti-anti-inspect
// @description  Bypass right-click and keyboard shortcuts blocking on websites.
// @version      1.1
// @author       asrvn
// @match        *://*/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://github.com/asrvn/anti-anti-inspect/blob/main/anti-anti-inspect.user.js
// @updateURL    https://github.com/asrvn/anti-anti-inspect/blob/main/anti-anti-inspect.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Remove inline blocking of right-click and keyboard shortcuts
    document.oncontextmenu = null;
    document.onkeydown = null;

    // Ensure all event listeners are removed after page load
    window.addEventListener('load', function() {
        document.body.removeEventListener('contextmenu', document.oncontextmenu);
        document.body.removeEventListener('keydown', document.onkeydown);
    }, true);

    // Stop propagation and default actions for context menu and keydown events
    window.addEventListener('keydown', function(event) {
        event.stopPropagation();
        event.preventDefault();
    }, true);

    window.addEventListener('contextmenu', function(event) {
        event.stopPropagation();
        event.preventDefault();
    }, true);

})();
