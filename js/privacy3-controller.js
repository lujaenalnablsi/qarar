"use strict";

/*=========================================================
    PRIVACY 3 CONTROLLER
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeCards();

    initializeButtons();

    initializeRipple();

    initializeKeyboard();

});

/*=========================================================
    ELEMENTS
=========================================================*/

const cards = document.querySelectorAll(".front-card");

const nextButton = document.getElementById("requestHelp");

const repeatButton = document.getElementById("repeatVoice");

let selectedFront = null;

/*=========================================================
    SELECT CARD
=========================================================*/

function initializeCards() {

    cards.forEach(card => {

       card.addEventListener("click", () => {

    cards.forEach(item => {
        item.classList.remove("active");
    });

    card.classList.add("active");

   selectedFront = {
    id: card.dataset.id,
    name: card.dataset.name
};

sessionStorage.setItem(
    "selectedFront",
    JSON.stringify(selectedFront)
);

    animateSelection(card);

    // الانتقال إلى الصفحة التالية بعد نصف ثانية
    setTimeout(() => {
        window.location.href = "privce4.html";
    }, 500);

});

    });

}

/*=========================================================
    CARD ANIMATION
=========================================================*/

function animateSelection(card) {

    card.animate([

        {
            transform: "scale(.95)"
        },

        {
            transform: "scale(1.05)"
        },

        {
            transform: "scale(1)"
        }

    ], {

        duration: 350,

        easing: "ease"

    });

}

/*=========================================================
    BUTTONS
=========================================================*/

function initializeButtons() {

    nextButton.addEventListener("click", () => {

        if (!selectedFront) {

            alert("يرجى اختيار الجبهة أولاً.");

            return;

        }

        nextButton.disabled = true;

        nextButton.innerHTML = `

            <i class="fa-solid fa-spinner fa-spin"></i>

            جاري المتابعة...

        `;

        setTimeout(() => {

            console.log("Selected Front:", selectedFront);

            // window.location.href = "privacy4.html";

        }, 1200);

    });

    repeatButton.addEventListener("click", () => {

        document.dispatchEvent(

            new CustomEvent("repeatVoice")

        );

    });

}

/*=========================================================
    RIPPLE EFFECT
=========================================================*/

function initializeRipple() {

    document.querySelectorAll("button,.front-card")

    .forEach(element => {

        element.addEventListener("pointerdown", e => {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = element.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";

            ripple.style.height = size + "px";

            ripple.style.left =

                (e.clientX - rect.left - size / 2) + "px";

            ripple.style.top =

                (e.clientY - rect.top - size / 2) + "px";

            element.appendChild(ripple);

            ripple.addEventListener("animationend", () => {

                ripple.remove();

            });

        });

    });

}

/*=========================================================
    KEYBOARD
=========================================================*/

function initializeKeyboard() {

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            cards.forEach(card => {

                card.classList.remove("active");

            });

            selectedFront = null;

        }

    });

}
/*=========================================================
    HOVER EFFECTS
=========================================================*/

cards.forEach(card => {

    card.addEventListener("pointerenter", () => {

        card.style.zIndex = "5";

    });

    card.addEventListener("pointerleave", () => {

        card.style.zIndex = "1";

    });

});

/*=========================================================
    CARD OBSERVER
=========================================================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

cards.forEach(card => observer.observe(card));

/*=========================================================
    TOUCH SUPPORT
=========================================================*/

cards.forEach(card => {

    card.addEventListener("touchstart", () => {

        cards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        selectedFront = card.dataset.id;

    }, {

        passive: true

    });

});

/*=========================================================
    DOUBLE CLICK
=========================================================*/

cards.forEach(card => {

    card.addEventListener("dblclick", () => {

        selectedFront = card.dataset.id;

        // الانتقال للصفحة التالية
        // window.location.href = "privacy4.html";

    });

});

/*=========================================================
    BUTTON ENABLE
=========================================================*/

const updateButtonState = () => {

    if (selectedFront) {

        nextButton.disabled = false;

        nextButton.classList.add("enabled");

    } else {

        nextButton.disabled = true;

        nextButton.classList.remove("enabled");

    }

};

updateButtonState();

/*=========================================================
    REPEAT BUTTON ANIMATION
=========================================================*/

repeatButton.addEventListener("pointerenter", () => {

    repeatButton.animate([

        {
            transform: "scale(1)"
        },

        {
            transform: "scale(1.06)"
        },

        {
            transform: "scale(1)"
        }

    ], {

        duration: 350

    });

});

/*=========================================================
    HEADER SHADOW
=========================================================*/

const header = document.querySelector(".top-bar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 15) {

        header.classList.add("header-shadow");

    } else {

        header.classList.remove("header-shadow");

    }

});

/*=========================================================
    PAGE FADE
=========================================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    requestAnimationFrame(() => {

        document.body.style.transition = "opacity .5s ease";

        document.body.style.opacity = "1";

    });

});

/*=========================================================
    SAVE CURRENT FRONT
=========================================================*/

function saveSelection() {

    if (!selectedFront) return;

    sessionStorage.setItem(

        "selectedFront",

        selectedFront

    );

}

cards.forEach(card => {

    card.addEventListener("click", saveSelection);

});

/*=========================================================
    RESTORE
=========================================================*/

const storedFront = sessionStorage.getItem("selectedFront");

if (storedFront) {

    const target = document.querySelector(

        `.front-card[data-id="${storedFront}"]`

    );

    if (target) {

        target.classList.add("active");

        selectedFront = storedFront;

        updateButtonState();

    }

}

/*=========================================================
    CLEANUP
=========================================================*/

window.addEventListener("beforeunload", () => {

    document.querySelectorAll(".ripple").forEach(r => r.remove());

});

/*=========================================================
    READY
=========================================================*/

console.log(

    "%cPrivacy3 Controller Ready",

    "color:#009688;font-size:15px;font-weight:bold;"

);