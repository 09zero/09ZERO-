/* =========================================================
   09ZERO - CONNECT.JS
   FORM INTERACTION
   SERVICE SELECTION
   BUDGET SELECTION
   VALIDATION
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const connectForm =
    document.getElementById("connectForm");

const connectSubmit =
    document.getElementById("connectSubmit");

const connectStatus =
    document.getElementById("connectFormStatus");

const serviceOptions =
    document.querySelectorAll(
        ".connect-service-option"
    );

const budgetOptions =
    document.querySelectorAll(
        ".connect-budget-option"
    );

const serviceInput =
    document.getElementById("service");

const budgetInput =
    document.getElementById("budget");


/* =========================================================
   SERVICE SELECTION
========================================================= */

serviceOptions.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            serviceOptions.forEach(
                function (item) {
                    item.classList.remove("active");
                }
            );

            this.classList.add("active");

            if (serviceInput) {
                serviceInput.value =
                    this.dataset.service || "";
            }

            clearFieldError("service");
        }
    );

});


/* =========================================================
   BUDGET SELECTION
========================================================= */

budgetOptions.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            budgetOptions.forEach(
                function (item) {
                    item.classList.remove("active");
                }
            );

            this.classList.add("active");

            if (budgetInput) {
                budgetInput.value =
                    this.dataset.budget || "";
            }

        }
    );

});


/* =========================================================
   FIELD ERROR
========================================================= */

function showFieldError(
    fieldName,
    message
) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.querySelector(
            `[data-error-for="${fieldName}"]`
        );

    if (field) {

        const parent =
            field.closest(".connect-field");

        if (parent) {
            parent.classList.add("has-error");
        }

    }

    if (error) {
        error.textContent = message;
    }

}


function clearFieldError(fieldName) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.querySelector(
            `[data-error-for="${fieldName}"]`
        );

    if (field) {

        const parent =
            field.closest(".connect-field");

        if (parent) {
            parent.classList.remove("has-error");
        }

    }

    if (error) {
        error.textContent = "";
    }

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateConnectForm() {

    let isValid = true;

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const message =
        document.getElementById("message");


    /* NAME */

    if (!name || !name.value.trim()) {

        showFieldError(
            "name",
            "Please enter your name."
        );

        isValid = false;

    } else {

        clearFieldError("name");

    }


    /* EMAIL */

    if (!email || !email.value.trim()) {

        showFieldError(
            "email",
            "Please enter your email."
        );

        isValid = false;

    } else if (
        !isValidEmail(
            email.value.trim()
        )
    ) {

        showFieldError(
            "email",
            "Please enter a valid email."
        );

        isValid = false;

    } else {

        clearFieldError("email");

    }


    /* SERVICE */

    if (
        serviceInput &&
        !serviceInput.value.trim()
    ) {

        showFieldError(
            "service",
            "Please select a service."
        );

        isValid = false;

    } else {

        clearFieldError("service");

    }


    /* MESSAGE */

    if (
        !message ||
        !message.value.trim()
    ) {

        showFieldError(
            "message",
            "Please tell us about your project."
        );

        isValid = false;

    } else {

        clearFieldError("message");

    }


    return isValid;

}


/* =========================================================
   STATUS
========================================================= */

function setConnectStatus(
    message,
    type
) {

    if (!connectStatus) {
        return;
    }

    connectStatus.textContent =
        message;

    connectStatus.className =
        "connect-form-status";

    if (type) {
        connectStatus.classList.add(type);
    }

}


/* =========================================================
   FORM SUBMIT
========================================================= */

if (connectForm) {

    connectForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            setConnectStatus("", "");


            /* VALIDATION */

            if (!validateConnectForm()) {

                setConnectStatus(
                    "Please complete the required fields.",
                    "error"
                );

                const firstError =
                    document.querySelector(
                        ".has-error input, .has-error textarea"
                    );

                if (firstError) {
                    firstError.focus();
                }

                return;

            }


            /* BUTTON LOADING */

            const originalButtonHTML =
                connectSubmit
                    ? connectSubmit.innerHTML
                    : "";

            if (connectSubmit) {

                connectSubmit.disabled =
                    true;

                connectSubmit.innerHTML =
                    `
                    <span>Sending...</span>
                    <span class="connect-submit-arrow">...</span>
                    `;

            }


            /*
               ------------------------------------------------
               TEMPORARY FRONTEND SUCCESS
               ------------------------------------------------

               Supabase connection will be added here.

               Do NOT add fake lead storage.
            */

            await new Promise(
                function (resolve) {
                    setTimeout(
                        resolve,
                        700
                    );
                }
            );


            setConnectStatus(
                "Your enquiry form is ready. Supabase submission will be connected next.",
                "success"
            );


            if (connectSubmit) {

                connectSubmit.disabled =
                    false;

                connectSubmit.innerHTML =
                    originalButtonHTML;

            }

        }
    );

}


/* =========================================================
   LIVE FIELD ERROR CLEAR
========================================================= */

const connectInputs =
    document.querySelectorAll(
        ".connect-field input, .connect-field textarea"
    );

connectInputs.forEach(function (input) {

    input.addEventListener(
        "input",
        function () {

            clearFieldError(
                this.id
            );

        }
    );

});


/* =========================================================
   ESCAPE STATUS
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            connectStatus
        ) {

            setConnectStatus(
                "",
                ""
            );

        }

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "09ZERO - Connect Page JS Loaded"
);

