"use strict";

/*==========================================
    ELEMENTS
==========================================*/

const loadingScreen =
document.getElementById("loadingScreen");

const successScreen =
document.getElementById("successScreen");

const waitScreen =
document.getElementById("waitScreen");

const counter =
document.getElementById("counter");

const finishBtn =
document.getElementById("finishBtn");

/*==========================================
    SHOW SCREEN
==========================================*/

function showScreen(screen){

    document
    .querySelectorAll(".screen")
    .forEach(s=>{

        s.classList.remove("active");

    });

    screen.classList.add("active");

}

/*==========================================
    VOICE
==========================================*/

function speak(text){

    speechSynthesis.cancel();

    const msg =
    new SpeechSynthesisUtterance(text);

    msg.lang = "ar-JO";

    msg.rate = .9;

    msg.pitch = 1;

    speechSynthesis.speak(msg);

}

/*==========================================
    START
==========================================*/

window.addEventListener("load",()=>{

    showScreen(loadingScreen);

    setTimeout(()=>{

        showScreen(successScreen);

        speak(

        "تم تسجيل صوتك بنجاح. شكراً لمشاركتك في العملية الانتخابية."

        );

        startCounter();

    },3000);

});

/*==========================================
    COUNTDOWN
==========================================*/

function startCounter(){

    let seconds = 5;

    counter.textContent = seconds;

    const timer = setInterval(()=>{

        seconds--;

        counter.textContent = seconds;

        if(seconds<=0){

            clearInterval(timer);

            speechSynthesis.cancel();

            showScreen(waitScreen);

        }

    },1000);

}

/*==========================================
    BUTTON
==========================================*/

finishBtn.addEventListener("click",()=>{

    speechSynthesis.cancel();

    showScreen(waitScreen);

});

/*==========================================
    STOP VOICE
==========================================*/

window.addEventListener(

"beforeunload",

()=>{

    speechSynthesis.cancel();

});