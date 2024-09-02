// ==UserScript==
// @name         anti-anti-inspect
// @namespace    https://github.com/asrvn/anti-anti-inspect
// @description  Bypass right-click and keyboard shortcuts blocking on websites.
// @version      1.3
// @author       asrvn
// @match        *://*/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://github.com/asrvn/anti-anti-inspect/blob/main/anti-anti-inspect.user.js
// @updateURL    https://github.com/asrvn/anti-anti-inspect/blob/main/anti-anti-inspect.user.js
// ==/UserScript==

(function() {

    'use strict';

    // Helper function to remove event listeners safely
    function removeEventListeners(eventName) {

        // Clone the original body to remove all inline event listeners
        const clone = document.body.cloneNode(true);
        document.body.parentNode.replaceChild(clone, document.body);

        // Reassign body element for further manipulations
        document.body = clone;

        // Remove specific event listeners added by JavaScript
        const events = ['contextmenu', 'keydown'];
        events.forEach((evt) => {
            window.addEventListener(evt, function(event) {
                if (eventName === evt) {
                    event.stopImmediatePropagation();
                }
            }, true);
        });

    }

    // Remove right-click and keydown blocking
    removeEventListeners('contextmenu');
    removeEventListeners('keydown');

})();
