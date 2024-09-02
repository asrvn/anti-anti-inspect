// ==UserScript==
// @name         anti-anti-inspect
// @namespace    https://github.com/asrvn/anti-anti-inspect
// @description  Bypass right-click and keyboard shortcuts blocking on websites.
// @version      1.4
// @author       asrvn
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Function to re-enable right-click
    function enableRightClick(event) {

        event.stopImmediatePropagation(); // Stop the event from reaching the original listener
        return true; // Allow default behavior

    }

    // Function to re-enable keyboard shortcuts
    function enableShortcuts(event) {

        const forbiddenKeys = [123, 'I'.charCodeAt(0), 'C'.charCodeAt(0), 'J'.charCodeAt(0), 'U'.charCodeAt(0)]; // F12, 'I', 'C', 'J', 'U'

        // Allow default actions for F12, Ctrl+Shift+I/C/J/U
        if (
            (event.keyCode === 123) || // F12
            (event.ctrlKey && event.shiftKey && forbiddenKeys.includes(event.keyCode)) || // Ctrl+Shift+I/C/J
            (event.ctrlKey && event.keyCode === 'U'.charCodeAt(0)) // Ctrl+U
        ) {
            event.stopImmediatePropagation(); // Stop the event from reaching the original listener
            return true; // Allow default behavior
        }

    }

    // Add event listeners to restore functionality
    document.addEventListener('contextmenu', enableRightClick, true); // Use capture phase to override
    document.addEventListener('keydown', enableShortcuts, true); // Use capture phase to override

})();
