// ==UserScript==
// @name         anti-anti-everything
// @namespace    https://github.com/asrvn/anti-anti-inspect
// @description  Bypass right-click and keyboard shortcuts blocking on websites.
// @version      1.0
// @author       asrvn
// @match        *://*/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://github.com/asrvn/anti-anti-inspect/blob/main/anti-anti-inspect.user.js
// @updateURL    https://github.com/asrvn/anti-anti-inspect/blob/main/anti-anti-inspect.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Utility function to remove all event listeners of a specific type
    function removeAllEventListeners(eventType) {
        let elements = document.querySelectorAll('*');
        elements.forEach(element => {
            let clone = element.cloneNode(true);
            element.parentNode.replaceChild(clone, element);
        });
    }

    // Remove all types of event listeners related to right-click and keyboard shortcuts
    function bypassAllEventListeners() {
        removeAllEventListeners('contextmenu');
        removeAllEventListeners('keydown');
        removeAllEventListeners('keypress');
        removeAllEventListeners('keyup');
    }

    // Initial cleanup on load
    window.addEventListener('load', function() {
        bypassAllEventListeners();
    }, true);

    // Observer to detect and bypass dynamically added event listeners
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                bypassAllEventListeners();
            }
        });
    });

    observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true
    });

    // Stop propagation and default actions for context menu and keydown events
    window.addEventListener('contextmenu', function(event) {
        event.stopPropagation();
    }, true);

    window.addEventListener('keydown', function(event) {
        if (event.key === 'F12' || (event.ctrlKey && (event.key === 'I' || event.key === 'i')) ||
            (event.ctrlKey && event.shiftKey && (event.key === 'C' || event.key === 'c')) ||
            (event.ctrlKey && event.shiftKey && (event.key === 'J' || event.key === 'j')) ||
            (event.ctrlKey && event.key === 'U' || event.key === 'u')) {
            // Allow DevTools shortcuts
            return;
        }
        event.stopPropagation();
    }, true);

})();
