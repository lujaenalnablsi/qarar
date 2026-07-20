"use strict";

/*=========================================================
    VOICE READER ENGINE
=========================================================*/

class VoiceReader {

    constructor() {

        this.voice = null;

        this.currentElement = null;

        this.hoverTimer = null;

        this.lastText = "";

        this.delay = 2000;

        this.initialize();

    }

    /*=================================================*/

    initialize() {

        this.loadVoices();

        speechSynthesis.onvoiceschanged = () => {

            this.loadVoices();

        };

        this.registerElements();

        this.registerRepeatEvents();

        this.registerVisibilityEvents();

    }

    /*=================================================*/

    loadVoices() {

        const voices = speechSynthesis.getVoices();

        this.voice =

            voices.find(v => v.lang === "ar-JO") ||

            voices.find(v => v.lang.startsWith("ar")) ||

            null;

    }

    /*=================================================*/

    speak(text) {

        if (!text) return;

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "ar-JO";

        utterance.rate = 0.9;

        utterance.pitch = 1;

        utterance.volume = 1;

        if (this.voice) {

            utterance.voice = this.voice;

        }

        speechSynthesis.speak(utterance);

        this.lastText = text;

    }

    /*=================================================*/

    stop() {

        clearTimeout(this.hoverTimer);

        speechSynthesis.cancel();

    }

    /*=================================================*/

    schedule(element) {

        clearTimeout(this.hoverTimer);

        speechSynthesis.cancel();

        this.currentElement = element;

        this.hoverTimer = setTimeout(() => {

            if (this.currentElement === element) {

                this.speak(

                    element.dataset.voice

                );

            }

        }, this.delay);

    }

    /*=================================================*/

    leave(element) {

        if (this.currentElement === element) {

            clearTimeout(this.hoverTimer);

            speechSynthesis.cancel();

            this.currentElement = null;

        }

    }
        /*=================================================
        REGISTER ELEMENTS
    =================================================*/

    registerElements() {

        const elements = document.querySelectorAll("[data-voice]");

        elements.forEach(element => {

            element.addEventListener("pointerenter", () => {

                if (this.currentElement === element) return;

                this.schedule(element);

            });

            element.addEventListener("pointerleave", () => {

                this.leave(element);

            });

            element.addEventListener("pointerdown", () => {

                clearTimeout(this.hoverTimer);

                speechSynthesis.cancel();

            });

        });

    }

    /*=================================================
        TOUCH SUPPORT
    =================================================*/

    registerTouchSupport() {

        const elements = document.querySelectorAll("[data-voice]");

        elements.forEach(element => {

            element.addEventListener("touchstart", () => {

                this.stop();

                this.speak(

                    element.dataset.voice

                );

            }, {

                passive: true

            });

        });

    }

    /*=================================================
        REPEAT
    =================================================*/

    registerRepeatEvents() {

        document.addEventListener("repeatVoice", () => {

            if (this.lastText) {

                this.speak(this.lastText);

            }

        });

    }

    /*=================================================
        VISIBILITY
    =================================================*/

    registerVisibilityEvents() {

        document.addEventListener(

            "visibilitychange",

            () => {

                if (document.hidden) {

                    this.stop();

                }

            }

        );

        window.addEventListener(

            "blur",

            () => {

                this.stop();

            }

        );

        window.addEventListener(

            "beforeunload",

            () => {

                this.stop();

            }

        );

    }

}
/*=========================================================
START ENGINE
=========================================================*/

const voiceReader = new VoiceReader();

voiceReader.registerTouchSupport();

/*=========================================================
KEYBOARD
=========================================================*/

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        voiceReader.stop();

    }

});

/*=========================================================
WELCOME MESSAGE
=========================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        voiceReader.speak(

            " . اختر المرشح الذي تريده. ضع مؤشر الفأرة فوق أي مرشح لمدة ثانيتين للاستماع إلى اسمه."

        );

    }, 800);

});

/*=========================================================
DEBUG
=========================================================*/

console.log(

"%cVoice Reader Ready",

"color:#17c38f;font-size:15px;font-weight:bold;"

);