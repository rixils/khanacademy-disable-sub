// ==UserScript==
// @name        khanacademy-disable-sub
// @description disable youtube subs by default
// @namespace   https://www.khanacademy.org/
// @include     https://www.khanacademy.org/*
// @version     0.1.0.1
// @author      liartuw
// @run-at      document-end
// @grant       none
// @downloadURL https://gitlab.com/zalent/khanacademy-disable-sub/raw/master/index.js
// @updateURL   https://gitlab.com/zalent/khanacademy-disable-sub/raw/master/index.js
// ==/UserScript==
(() => {
    addOnChangeEventListenerTo(document.body, () => {
        if (isYoutubePlayerLoaded()) {
            disableYoutubeSubtitles();
        }
    });


    function addOnChangeEventListenerTo(element, listener) {
        let observer = new MutationObserver(listener);
        observer.observe(
            element,
            {
                childList: true,
                subtree: true,
                attributes: false,
                characterData: false,
            }
        );
    }


    function isYoutubePlayerLoaded() {
        let playerContainer = document.querySelector(PLAYER_CONTAINER_SELECTOR);
        let isPlayerLoaded = playerContainer !== null;
        return isPlayerLoaded;
    }


    function disableYoutubeSubtitles() {
        let iframe = getYoutubePlayerIframe();
        let isSubEnabled = iframe.src.includes(SUB_ENABLED_PARAM);
        if (isSubEnabled) {
            let srcWithoutSub = iframe.src.replace(SUB_ENABLED_PARAM, SUB_DISABLED_PARAM);
            iframe.src = srcWithoutSub;
        }
    }


    function getYoutubePlayerIframe() {
        let iframeContainer = document.querySelector(PLAYER_CONTAINER_SELECTOR);
        return iframeContainer.firstChild;
    }


    const PLAYER_CONTAINER_SELECTOR = '.ka-video-player-container';
    const SUB_ENABLED_PARAM = 'cc_load_policy=1';
    const SUB_DISABLED_PARAM = 'cc_load_policy=0';
})();
