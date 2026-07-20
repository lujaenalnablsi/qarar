"use strict";

/*=========================================
    ELEMENTS
=========================================*/

const frontName =
document.getElementById("frontName");

const candidateContainer =
document.getElementById("candidateContainer");

const confirmBtn =
document.getElementById("confirmBtn");

/*=========================================
    LOAD DATA
=========================================*/

const selectedFront =
JSON.parse(
sessionStorage.getItem("selectedFront")
);

const selectedCandidates =
JSON.parse(
sessionStorage.getItem("selectedCandidates")
) || [];

/*=========================================
    SHOW FRONT
=========================================*/

if(selectedFront){

    frontName.textContent =
    `${selectedFront.name} (${selectedFront.id})`;

}else{

    frontName.textContent =
    "لم يتم اختيار جبهة";

}

/*=========================================
    SHOW CANDIDATES
=========================================*/

candidateContainer.innerHTML = "";

if(selectedCandidates.length){

    selectedCandidates.forEach(candidate=>{

        candidateContainer.innerHTML +=

        `
        <div class="candidate">

            <i class="fa-solid fa-user"></i>

            <span>
                ${candidate.name}
            </span>

        </div>
        `;

    });

}else{

    candidateContainer.innerHTML =

    `
    <div class="candidate">

        <i class="fa-solid fa-circle-xmark"></i>

        <span>

            لا يوجد مرشحون

        </span>

    </div>
    `;

}

/*=========================================
    CONFIRM BUTTON
=========================================*/

confirmBtn.addEventListener("click",()=>{

    confirmBtn.disabled=true;

    confirmBtn.innerHTML=`

    <i class="fa-solid fa-spinner fa-spin"></i>

    جاري تسجيل التصويت...

    `;

    setTimeout(()=>{

        sessionStorage.setItem(
            "voteCompleted",
            "true"
        );

        window.location.href =
        "vote-success.html";

    },1800);

});

/*=========================================
    PAGE ANIMATION
=========================================*/

document.addEventListener(
"DOMContentLoaded",
()=>{

    document
    .querySelector(".confirm-card")
    .animate(

    [

        {

            opacity:0,

            transform:
            "translateY(30px)"

        },

        {

            opacity:1,

            transform:
            "translateY(0)"

        }

    ],

    {

        duration:700,

        easing:"ease"

    });

});

/*=========================================
    ESC
=========================================*/

document.addEventListener(
"keydown",
e=>{

    if(e.key==="Escape"){

        history.back();

    }

});

/*=========================================
    PREVENT DOUBLE CLICK
=========================================*/

let clicked=false;

confirmBtn.addEventListener("click",()=>{

    if(clicked) return;

    clicked=true;

});

/*=========================================
    RIPPLE EFFECT
=========================================*/

document
.querySelectorAll("button")
.forEach(button=>{

    button.addEventListener(

    "pointerdown",

    e=>{

        const ripple =
        document.createElement("span");

        ripple.className="ripple";

        const rect=
        button.getBoundingClientRect();

        const size=
        Math.max(rect.width,rect.height);

        ripple.style.width=
        size+"px";

        ripple.style.height=
        size+"px";

        ripple.style.left=
        (e.clientX-rect.left-size/2)+"px";

        ripple.style.top=
        (e.clientY-rect.top-size/2)+"px";

        button.appendChild(ripple);

        ripple.addEventListener(

        "animationend",

        ()=>ripple.remove()

        );

    });

});