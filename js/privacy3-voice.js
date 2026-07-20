"use strict";

/*=========================================================
    PRIVACY 3 VOICE ENGINE
=========================================================*/

class VoiceEngine {

    constructor() {

        this.voice = null;

        this.currentElement = null;

        this.hoverTimer = null;

        this.lastSentence = "";

        this.delay = 2000;

        this.initialize();

    }

    /*=================================================*/

    initialize() {

        this.loadVoices();

        speechSynthesis.onvoiceschanged = () => {

            this.loadVoices();

        };

        this.registerVoiceElements();

        this.registerRepeatButton();

        window.addEventListener("beforeunload", () => {

            speechSynthesis.cancel();

        });

    }

    /*=================================================*/

    loadVoices() {

        const voices = speechSynthesis.getVoices();

        this.voice =

            voices.find(v =>

                v.lang === "ar-JO"

            ) ||

            voices.find(v =>

                v.lang.startsWith("ar")

            ) ||

            null;

    }

    /*=================================================*/

    speak(text) {

        if (!text) return;

        speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "ar-JO";

        speech.rate = .9;

        speech.pitch = 1;

        speech.volume = 1;

        if (this.voice) {

            speech.voice = this.voice;

        }

        speechSynthesis.speak(speech);

        this.lastSentence = text;

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

    leave() {

        clearTimeout(this.hoverTimer);

        speechSynthesis.cancel();

        this.currentElement = null;

    }
    /*=================================================
        REGISTER ELEMENTS
    =================================================*/

    registerVoiceElements() {

        const elements = document.querySelectorAll("[data-voice]");

        elements.forEach(element => {

            element.addEventListener("pointerenter", () => {

                if (this.currentElement === element) return;

                this.schedule(element);

            });

            element.addEventListener("pointerleave", () => {

                if (this.currentElement === element) {

                    this.leave();

                }

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

                clearTimeout(this.hoverTimer);

                speechSynthesis.cancel();

                this.speak(

                    element.dataset.voice

                );

            },{

                passive:true

            });

        });

    }

    /*=================================================
        REPEAT BUTTON
    =================================================*/

    registerRepeatButton() {

        document.addEventListener("repeatVoice", () => {

            if (this.lastSentence) {

                this.speak(this.lastSentence);

            }

        });

    }

    /*=================================================
        STOP SHORTCUT
    =================================================*/

    registerKeyboard() {

        document.addEventListener("keydown", e => {

            if (e.key === "Escape") {

                this.stop();

            }

        });

    }

}

/*=========================================================
    START ENGINE
=========================================================*/

const privacyVoice = new VoiceEngine();

privacyVoice.registerTouchSupport();

privacyVoice.registerKeyboard();

/*=========================================================
    PAGE INTRO
=========================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        privacyVoice.speak(

            "ماختر الجبهة التي تريدها. مرر مؤشر الفأرة فوق أي جبهة لمدة ثانيتين للاستماع إلى اسمها."

        );

    },700);

});

/*=========================================================
    STOP ON TAB HIDDEN
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        privacyVoice.stop();

    }

});

/*=========================================================
    WINDOW BLUR
=========================================================*/

window.addEventListener("blur",()=>{

    privacyVoice.stop();

});

/*=========================================================
    CONSOLE
=========================================================*/

console.log(

"%cPrivacy3 Voice Engine Ready",

"color:#009688;font-size:16px;font-weight:bold;"

);