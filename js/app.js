/*=========================================
    QARAR - Privacy Voting
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initVotingCards();
    initContinueButton();
    initStepperAnimation();
    initPageAnimation();

});

/*=========================================
    Elements
=========================================*/

const voteCards = document.querySelectorAll(".vote-card");
const continueBtn = document.querySelector(".continue-btn");

/*=========================================
    Current Selection
=========================================*/

let selectedVote = "assistant";

/*=========================================
    Voting Cards
=========================================*/

function initVotingCards() {

    voteCards.forEach(card => {

        card.addEventListener("click", () => {

            voteCards.forEach(item => {

                item.classList.remove("active");

                const radio = item.querySelector(".radio");

                radio.classList.remove("checked");

            });

            card.classList.add("active");

            card.querySelector(".radio").classList.add("checked");

            selectedVote = card.dataset.type;

            enableContinueButton();

        });

    });

}

/*=========================================
    Continue Button
=========================================*/

function initContinueButton() {

    continueBtn.addEventListener("click", () => {

        continueBtn.disabled = true;

        continueBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            جاري تجهيز جلسة التصويت...
        `;

        setTimeout(() => {

            if (selectedVote === "assistant") {

                // صفحة التصويت المستقل
                window.location.href = "privcy2.html";

            } else {

                // صفحة التصويت العادي
                window.location.href = "vote.html";

            }

        }, 1800);

    });

}

/*=========================================
    Enable Button
=========================================*/

function enableContinueButton() {

    continueBtn.classList.add("enabled");

}

/*=========================================
    Stepper Animation
=========================================*/

function initStepperAnimation() {

    const steps = document.querySelectorAll(".step");

    steps.forEach((step, index) => {

        step.style.animationDelay = `${index * .15}s`;

    });

}

/*=========================================
    Page Fade
=========================================*/

function initPageAnimation() {

    document.body.style.opacity = "0";

    requestAnimationFrame(() => {

        document.body.style.transition = "opacity .6s ease";

        document.body.style.opacity = "1";

    });

}

/*=========================================
    Hover Effect
=========================================*/

voteCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/*=========================================
    Keyboard Support
=========================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "1") {

        voteCards[0].click();

    }

    if (e.key === "2") {

        voteCards[1].click();

    }

});

/*=========================================
    Ripple Effect
=========================================*/

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left = (e.offsetX - diameter / 2) + "px";

        circle.style.top = (e.offsetY - diameter / 2) + "px";

        circle.classList.add("ripple");

        this.querySelector(".ripple")?.remove();

        this.appendChild(circle);

    });

});

/*=========================================
    Console
=========================================*/

console.log("QARAR Privacy Voting Loaded Successfully");
