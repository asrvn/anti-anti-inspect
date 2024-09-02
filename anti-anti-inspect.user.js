// ==UserScript==
// @name         anti-anti-inspect
// @namespace    https://github.com/asrvn/anti-anti-inspect
// @description  Bypass right-click and keyboard shortcuts blocking on websites.
// @version      1.5
// @author       asrvn
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Helper function to remove specific event listeners
    function removeEventListeners(element, type) {
        let clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);
    }

    // Remove event listeners for right-click and keyboard shortcuts
    function restoreDefaultActions() {
        removeEventListeners(document, 'contextmenu');
        removeEventListeners(document, 'keydown');
        removeEventListeners(document, 'keypress');
        removeEventListeners(document, 'keyup');
    }

    // Override addEventListener to prevent blocking event listeners from being added
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'contextmenu' || type === 'keydown' || type === 'keypress' || type === 'keyup') {
            console.log(`Blocked adding event listener for ${type}`);
            return; // Block the addition of the listener
        }
        originalAddEventListener.call(this, type, listener, options);
    };

    // MutationObserver to monitor DOM changes and remove blocking event listeners dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                restoreDefaultActions();
            }
        });
    });

    observer.observe(document, { childList: true, subtree: true });

    // Restore default actions on page load
    window.addEventListener('DOMContentLoaded', restoreDefaultActions);
    window.addEventListener('load', restoreDefaultActions);

    // Initial call to remove any event listeners that may already be set
    restoreDefaultActions();

})();
