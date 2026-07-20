"use strict";

/*=========================================================
    PRIVCE4 CONTROLLER
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeCandidateCards();
    initializeButtons();
    initializeRippleEffect();
    restoreSelection();

});

/*=========================================================
    ELEMENTS
=========================================================*/

const candidateCards = document.querySelectorAll(".candidate-card");
const finishButton = document.getElementById("finishButton");
const helpButton = document.getElementById("helpButton");

const selectedCandidates = [];

/*=========================================================
    INITIALIZE CARDS
=========================================================*/

function initializeCandidateCards() {

    candidateCards.forEach(card => {

        card.addEventListener("click", () => {

            selectCandidate(card);

        });

    });

}

/*=========================================================
    SELECT MULTIPLE
=========================================================*/

function selectCandidate(card) {

    const id = card.dataset.id;
    const name = card.querySelector("h3").textContent;

    if (card.classList.contains("active")) {

        card.classList.remove("active");

        const index = selectedCandidates.findIndex(c => c.id === id);

        if (index !== -1) {
            selectedCandidates.splice(index, 1);
        }

    } else {

        card.classList.add("active");

        selectedCandidates.push({
            id,
            name
        });

        animateSelection(card);

    }

    sessionStorage.setItem(
        "selectedCandidates",
        JSON.stringify(selectedCandidates)
    );

    finishButton.disabled = selectedCandidates.length === 0;

}

/*=========================================================
    ANIMATION
=========================================================*/

function animateSelection(card) {

    card.animate([
        {
            transform: "scale(.95)"
        },
        {
            transform: "scale(1.03)"
        },
        {
            transform: "scale(1)"
        }
    ], {
        duration: 320,
        easing: "ease"
    });

}

/*=========================================================
    RESTORE
=========================================================*/

function restoreSelection() {

    const saved = JSON.parse(
        sessionStorage.getItem("selectedCandidates") || "[]"
    );

    saved.forEach(candidate => {

        const card = document.querySelector(
            `.candidate-card[data-id="${candidate.id}"]`
        );

        if (card) {

            card.classList.add("active");
            selectedCandidates.push(candidate);

        }

    });

    finishButton.disabled = selectedCandidates.length === 0;

}

/*=========================================================
    BUTTONS
=========================================================*/

function initializeButtons() {

    finishButton.disabled = true;

    finishButton.addEventListener("click", () => {

        if (selectedCandidates.length === 0) {

            alert("يرجى اختيار مرشح واحد على الأقل.");

            return;

        }

        sessionStorage.setItem(
            "selectedCandidates",
            JSON.stringify(selectedCandidates)
        );

        finishButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            جاري الحفظ...
        `;

        finishButton.disabled = true;

        setTimeout(() => {

            window.location.href = "privce5.html";

        }, 700);

    });

    helpButton.addEventListener("click", () => {

        alert("تم إرسال طلب المساعدة.");

    });

}

/*=========================================================
    RIPPLE
=========================================================*/

function initializeRippleEffect() {

    document
        .querySelectorAll("button,.candidate-card")
        .forEach(item => {

            item.addEventListener("pointerdown", e => {

                const ripple = document.createElement("span");

                ripple.className = "ripple";

                const rect = item.getBoundingClientRect();

                const size = Math.max(rect.width, rect.height);

                ripple.style.width = size + "px";
                ripple.style.height = size + "px";

                ripple.style.left =
                    (e.clientX - rect.left - size / 2) + "px";

                ripple.style.top =
                    (e.clientY - rect.top - size / 2) + "px";

                item.appendChild(ripple);

                ripple.addEventListener(
                    "animationend",
                    () => ripple.remove()
                );

            });

        });

}

/*=========================================================
    KEYBOARD
=========================================================*/

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        candidateCards.forEach(card => {

            card.classList.remove("active");

        });

        selectedCandidates.length = 0;

        sessionStorage.removeItem("selectedCandidates");

        finishButton.disabled = true;

    }

});

/*=========================================================
    PAGE READY
=========================================================*/

console.log(
    "%cCandidate Controller Ready",
    "color:#0c5d57;font-size:16px;font-weight:bold;"
);