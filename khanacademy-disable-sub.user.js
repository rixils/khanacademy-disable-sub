// ==UserScript==
// @name khanacademy-disable-sub
// @description disables youtube subtitles by default
// @namespace https://gitlab.com/zalent
// @homepageURL https://gitlab.com/zalent/khanacademy-disable-sub
// @include https://www.khanacademy.org/*
// @version 0.1.0.6
// @license MIT
// @author rixils
// @run-at document-end
// @grant none
// @downloadURL https://gitlab.com/zalent/khanacademy-disable-sub/raw/master/khanacademy-disable-sub.user.js
// @updateURL https://gitlab.com/zalent/khanacademy-disable-sub/raw/master/khanacademy-disable-sub.meta.js
// ==/UserScript==
(() => {
    addOnChangeEventListenerTo(document.body, () => {
        if (isVideoPlayerLoaded()) {
            disableVideoPlayerSubtitles();
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


    function isVideoPlayerLoaded() {
        let playerContainer = getVideoPlayerContainer();
        return playerContainer !== null;
    }


    function disableVideoPlayerSubtitles() {
        let playerIframe = getVideoPlayerContainer().firstChild;
        let isSubEnabled = playerIframe.src.includes(SUB_ENABLED_URL_PARAM);
        if (isSubEnabled) {
            let srcUrlWithSubDisabled = playerIframe.src.replace(
                SUB_ENABLED_URL_PARAM,
                SUB_DISABLED_URL_PARAM
            );
            playerIframe.src = srcUrlWithSubDisabled;
        }
    }


    function getVideoPlayerContainer() {
        return document.querySelector(PLAYER_CONTAINER_SELECTOR);
    }


    const PLAYER_CONTAINER_SELECTOR = '.ka-video-player-container';
    const SUB_ENABLED_URL_PARAM = 'cc_load_policy=1';
    const SUB_DISABLED_URL_PARAM = 'cc_load_policy=0';
})();
