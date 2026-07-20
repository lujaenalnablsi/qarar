"use strict";

/*=========================================================
    VOICE ENGINE
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

    initialize() {

        this.loadVoices();

        speechSynthesis.onvoiceschanged = () => {

            this.loadVoices();

        };

        this.registerVoiceElements();

        window.addEventListener("beforeunload", () => {

            speechSynthesis.cancel();

        });

    }

    /*=========================================================*/

    loadVoices() {

        const voices = speechSynthesis.getVoices();

        this.voice =

            voices.find(v => v.lang === "ar-JO") ||

            voices.find(v => v.lang.startsWith("ar")) ||

            null;

    }

    /*=========================================================*/

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

    /*=========================================================*/

    schedule(element) {

        clearTimeout(this.hoverTimer);

        speechSynthesis.cancel();

        this.currentElement = element;

        this.hoverTimer = setTimeout(() => {

            if (this.currentElement === element) {

                this.speak(element.dataset.voice);

            }

        }, this.delay);

    }

    /*=========================================================*/

    leave() {

        clearTimeout(this.hoverTimer);

        speechSynthesis.cancel();

        this.currentElement = null;

    }

    /*=========================================================*/

    registerVoiceElements() {

        document.querySelectorAll("[data-voice]")

        .forEach(element => {

            element.addEventListener("pointerenter", () => {

                this.schedule(element);

            });

            element.addEventListener("pointerleave", () => {

                this.leave();

            });

            element.addEventListener("pointerdown", () => {

                clearTimeout(this.hoverTimer);

                speechSynthesis.cancel();

            });

        });

    }

}

/*=========================================================
    START
=========================================================*/

window.privacyVoice = new VoiceEngine();

/*=========================================================
    INTRO
=========================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        privacyVoice.speak(

            " انت الان صفحة تأكيد التصويت. قم بمراجعة الجبهة والمرشح المختار، ثم اضغط على زر تسجيل التصويت."

        );

    }, 700);

});