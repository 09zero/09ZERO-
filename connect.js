/* =========================================================
   09ZERO - CONNECT.JS
   Form interaction • Service/Budget selection • Validation
   EmailJS Integration
   ========================================================= */

"use strict";

/* =========================================================
   EMAILJS CONFIGURATION
   ========================================================= */

const EMAILJS_PUBLIC_KEY = "WoN__xLJSJd2LOaAo";
const EMAILJS_SERVICE_ID = "service_krx8nuk";
const EMAILJS_TEMPLATE_ID = "template_e0a6d2n";

/* Initialize EmailJS */
emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});


document.addEventListener("DOMContentLoaded", () => {

    const connectForm = document.getElementById("connectForm");
    const connectSubmit = document.getElementById("connectSubmit");
    const connectStatus = document.getElementById("connectFormStatus");

    const serviceOptions = document.querySelectorAll(
        ".connect-service-option"
    );

    const budgetOptions = document.querySelectorAll(
        ".connect-budget-option"
    );

    const serviceInput = document.getElementById("service");
    const budgetInput = document.getElementById("budget");


    /* =========================================================
       SERVICE SELECTION
       ========================================================= */

    serviceOptions.forEach((button) => {

        button.addEventListener("click", () => {

            serviceOptions.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (serviceInput) {
                serviceInput.value =
                    button.dataset.service || "";
            }

            clearFieldError("service");
        });

    });


    /* =========================================================
       BUDGET SELECTION
       ========================================================= */

    budgetOptions.forEach((button) => {

        button.addEventListener("click", () => {

            budgetOptions.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (budgetInput) {
                budgetInput.value =
                    button.dataset.budget || "";
            }

            clearFieldError("budget");
        });

    });


    /* =========================================================
       FIELD ERROR HELPERS
       ========================================================= */

    function showFieldError(fieldName, message) {

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

            field.setAttribute(
                "aria-invalid",
                "true"
            );
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
                parent.classList.remove(
                    "has-error"
                );
            }

            field.removeAttribute(
                "aria-invalid"
            );
        }

        if (error) {
            error.textContent = "";
        }
    }


    /* =========================================================
       EMAIL VALIDATION
       ========================================================= */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );
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
        type = ""
    ) {

        if (!connectStatus) {
            return;
        }

        connectStatus.textContent =
            message;

        connectStatus.className =
            "connect-form-status";

        if (type) {
            connectStatus.classList.add(
                type
            );
        }

        connectStatus.setAttribute(
            "role",
            "status"
        );

        connectStatus.setAttribute(
            "aria-live",
            "polite"
        );
    }


    /* =========================================================
       FORM SUBMIT
       ========================================================= */

    if (connectForm) {

        connectForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                setConnectStatus("");


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

                    connectSubmit.setAttribute(
                        "aria-busy",
                        "true"
                    );

                    connectSubmit.innerHTML = `
                        <span>Sending...</span>
                        <span class="connect-submit-arrow">
                            →
                        </span>
                    `;
                }


                try {

                    /* =================================================
                       SEND FORM USING EMAILJS
                       ================================================= */

                    await emailjs.sendForm(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        connectForm
                    );


                    /* =================================================
                       SUCCESS
                       ================================================= */

                    setConnectStatus(
                        "Thanks! Your enquiry has been sent successfully.",
                        "success"
                    );


                    /* RESET FORM */

                    connectForm.reset();


                    /* RESET SERVICE */

                    serviceOptions.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    /* RESET BUDGET */

                    budgetOptions.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    /* CLEAR ERRORS */

                    [
                        "name",
                        "email",
                        "service",
                        "budget",
                        "message"
                    ].forEach(
                        (fieldName) => {

                            clearFieldError(
                                fieldName
                            );
                        }
                    );


                } catch (error) {

                    console.error(
                        "09ZERO EmailJS error:",
                        error
                    );


                    setConnectStatus(
                        "Something went wrong while sending your enquiry. Please try again.",
                        "error"
                    );

                } finally {

                    /* RESTORE BUTTON */

                    if (connectSubmit) {

                        connectSubmit.disabled =
                            false;

                        connectSubmit.removeAttribute(
                            "aria-busy"
                        );

                        connectSubmit.innerHTML =
                            originalButtonHTML;
                    }
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


    connectInputs.forEach((input) => {

        input.addEventListener(
            "input",
            () => {

                clearFieldError(
                    input.id
                );
            }
        );
    });


    /* =========================================================
       ESCAPE STATUS
       ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                connectStatus
            ) {

                setConnectStatus("");
            }
        }
    );


    /* =========================================================
       CONSOLE
       ========================================================= */

    console.log(
        "09ZERO - Connect Page JS Loaded"
    );

});
