/*==================================================
    PRIVCY2.JS
    QARAR - Smart Privacy Assistant
==================================================*/

"use strict";

/*==================================================
GLOBAL VARIABLES
==================================================*/

const voiceElements = document.querySelectorAll("[data-voice]");

const assistantButton = document.getElementById("startAssistant");

let activeElement = null;

let arabicVoice = null;

/*==================================================
LOAD VOICES
==================================================*/

function loadArabicVoice() {

    const voices = speechSynthesis.getVoices();

    arabicVoice =

        voices.find(v =>

            v.lang.startsWith("ar") &&

            v.name.toLowerCase().includes("arab")

        ) ||

        voices.find(v =>

            v.lang.startsWith("ar")

        ) ||

        null;

}

loadArabicVoice();

speechSynthesis.onvoiceschanged = loadArabicVoice;

/*==================================================
SPEAK FUNCTION
==================================================*/

function speak(text){

    if(!text) return;

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "ar-JO";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;

    if(arabicVoice){

        speech.voice = arabicVoice;

    }

    speechSynthesis.speak(speech);

}

/*==================================================
VOICE ENGINE
==================================================*/

voiceElements.forEach(element=>{

    element.addEventListener("pointerenter",()=>{

        if(activeElement===element) return;

        activeElement=element;

        speak(element.dataset.voice);

    });

    element.addEventListener("pointerleave",()=>{

        activeElement=null;

    });

});

/*==================================================
STOP BUTTON
==================================================*/

const stopButton=document.querySelector(".voice-stop");

if(stopButton){

    stopButton.addEventListener("click",()=>{

        speechSynthesis.cancel();

    });

}

/*==================================================
START ASSISTANT
==================================================*/

if (assistantButton) {
    assistantButton.addEventListener("click", () => {

        speak("مرحباً بك، سأقوم بمساعدتك خلال عملية التصويت خطوة بخطوة.");

        assistantButton.classList.add("button-active");

        setTimeout(() => {
            window.location.href = "privacy3.html";
        }, 1500);

    });
}
/*==================================================
RIPPLE EFFECT
==================================================*/

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("pointerdown",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";

        ripple.style.height=size+"px";

        ripple.style.left=(e.clientX-rect.left-size/2)+"px";

        ripple.style.top=(e.clientY-rect.top-size/2)+"px";

        this.appendChild(ripple);

        ripple.addEventListener("animationend",()=>{

            ripple.remove();

        });

    });

});

/*==================================================
HEADER SHADOW
==================================================*/

window.addEventListener("scroll",()=>{

    const header=document.querySelector(".top-header");

    if(window.scrollY>20){

        header.classList.add("header-shadow");

    }else{

        header.classList.remove("header-shadow");

    }

});
/*==================================================
STEPPER ANIMATION
==================================================*/

const steps = document.querySelectorAll(".step");

steps.forEach((step, index) => {

    step.style.transition = "all .5s ease";
    step.style.transitionDelay = `${index * 120}ms`;

});

/*==================================================
FEATURE CARD EFFECTS
==================================================*/

const featureCards = document.querySelectorAll(".feature-box");

featureCards.forEach(card => {

    card.addEventListener("pointerenter", () => {

        card.classList.add("feature-active");

    });

    card.addEventListener("pointerleave", () => {

        card.classList.remove("feature-active");

    });

});

/*==================================================
LOCK ANIMATION
==================================================*/

const lock = document.querySelector(".lock-center");

function pulseLock(){

    if(!lock) return;

    lock.animate([

        {
            transform:"scale(1)"
        },

        {
            transform:"scale(1.08)"
        },

        {
            transform:"scale(1)"
        }

    ],{

        duration:1800,
        iterations:1,
        easing:"ease"

    });

}

setInterval(pulseLock,3500);

/*==================================================
AUDIO WAVE
==================================================*/

const waves=document.querySelectorAll(".audio-wave span");

function activateWave(){

    waves.forEach((wave,index)=>{

        wave.style.animationPlayState="running";

        wave.style.animationDelay=`${index*80}ms`;

    });

}

function stopWave(){

    waves.forEach(wave=>{

        wave.style.animationPlayState="paused";

    });

}

activateWave();

/*==================================================
VOICE CALLBACK
==================================================*/

const originalSpeak=speak;

window.speak=function(text){

    activateWave();

    originalSpeak(text);

    speechSynthesis.cancel();

    const speech=new SpeechSynthesisUtterance(text);

    speech.lang="ar-JO";

    speech.rate=.9;

    speech.pitch=1;

    speech.volume=1;

    if(arabicVoice){

        speech.voice=arabicVoice;

    }

    speech.onend=()=>{

        stopWave();

    };

    speechSynthesis.speak(speech);

};

/*==================================================
WELCOME MESSAGE
==================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        speak("مرحباً بك في منصة قرار. تم تفعيل وضع الخصوصية. مرر مؤشر الفأرة فوق أي عنصر لسماع وصفه.");

    },700);

});

/*==================================================
KEYBOARD SHORTCUTS
==================================================*/

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "Escape":

            speechSynthesis.cancel();

            break;

        case "Enter":

            if(document.activeElement){

                document.activeElement.click();

            }

            break;

        case " ":

            e.preventDefault();

            speechSynthesis.cancel();

            break;

    }

});

/*==================================================
DISABLE TEXT SELECTION
==================================================*/

document.addEventListener("selectstart",(e)=>{

    if(e.target.closest("button")){

        e.preventDefault();

    }

});

/*==================================================
TOUCH SUPPORT
==================================================*/

voiceElements.forEach(element=>{

    element.addEventListener("touchstart",()=>{

        if(activeElement===element) return;

        activeElement=element;

        speak(element.dataset.voice);

    },{

        passive:true

    });

});

/*==================================================
AUTO FOCUS
==================================================*/

const firstVoice=document.querySelector("[data-voice]");

if(firstVoice){

    firstVoice.setAttribute("tabindex","0");

}

/*==================================================
INTERSECTION ANIMATION
==================================================*/

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show-element");

        }

    });

},{

    threshold:.15

});

document.querySelectorAll(

    ".feature-box,.privacy-information,.assistant-button,.privacy-title"

).forEach(el=>{

    observer.observe(el);

});

/*==================================================
PERFORMANCE
==================================================*/

window.addEventListener("beforeunload",()=>{

    speechSynthesis.cancel();

});

/*==================================================
CONSOLE
==================================================*/

console.log(

"%cQARAR Privacy Assistant Loaded",

"color:#0b6e67;font-size:16px;font-weight:bold;"

);