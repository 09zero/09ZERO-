"use strict";


// =====================================================
// 09ZERO - CONNECT PAGE
// NODE.JS BACKEND CONNECTION
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const connectForm = document.getElementById("connectForm");
    const connectSubmit = document.getElementById("connectSubmit");
    const connectFormStatus = document.getElementById("connectFormStatus");

    const serviceInput = document.getElementById("service");
    const budgetInput = document.getElementById("budget");

    const serviceButtons = document.querySelectorAll(
        "[data-service]"
    );

    const budgetButtons = document.querySelectorAll(
        "[data-budget]"
    );


    // =================================================
    // SERVICE BUTTONS
    // =================================================

    serviceButtons.forEach((button) => {

        button.addEventListener("click", () => {

            serviceButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (serviceInput) {
                serviceInput.value =
                    button.dataset.service || "";
            }

        });

    });


    // =================================================
    // BUDGET BUTTONS
    // =================================================

    budgetButtons.forEach((button) => {

        button.addEventListener("click", () => {

            budgetButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (budgetInput) {
                budgetInput.value =
                    button.dataset.budget || "";
            }

        });

    });


    // =================================================
    // STATUS MESSAGE
    // =================================================

    function setConnectStatus(message, type = "") {

        if (!connectFormStatus) {
            return;
        }

        connectFormStatus.textContent = message;

        connectFormStatus.className =
            "connect-form-status";

        if (type) {
            connectFormStatus.classList.add(type);
        }

    }


    // =================================================
    // FORM SUBMIT
    // =================================================

    if (connectForm) {

        connectForm.addEventListener("submit", async (event) => {

            event.preventDefault();


            // ---------------------------------------------
            // GET FORM VALUES
            // ---------------------------------------------

            const name =
                document.getElementById("name")?.value.trim() || "";

            const company =
                document.getElementById("company")?.value.trim() || "";

            const email =
                document.getElementById("email")?.value.trim() || "";

            const phone =
                document.getElementById("phone")?.value.trim() || "";

            const service =
                serviceInput?.value.trim() || "";

            const budget =
                budgetInput?.value.trim() || "";

            const message =
                document.getElementById("message")?.value.trim() || "";


            // ---------------------------------------------
            // BASIC VALIDATION
            // ---------------------------------------------

            if (!name) {

                setConnectStatus(
                    "Please enter your name.",
                    "error"
                );

                document.getElementById("name")?.focus();

                return;
            }


            if (!email) {

                setConnectStatus(
                    "Please enter your email.",
                    "error"
                );

                document.getElementById("email")?.focus();

                return;
            }


            if (!service) {

                setConnectStatus(
                    "Please select a service.",
                    "error"
                );

                return;
            }


            if (!message) {

                setConnectStatus(
                    "Please tell us about your project.",
                    "error"
                );

                document.getElementById("message")?.focus();

                return;
            }


            // =================================================
            // LOADING STATE
            // =================================================

            const originalButtonText =
                connectSubmit?.textContent || "Send Enquiry";

            if (connectSubmit) {
                connectSubmit.disabled = true;
                connectSubmit.textContent = "Sending...";
            }

            setConnectStatus(
                "Sending your enquiry...",
                "loading"
            );


            try {

                // =============================================
                // FORM DATA
                // =============================================

                const formData = {

                    name: name,

                    company: company,

                    email: email,

                    phone: phone,

                    service: service,

                    budget: budget,

                    message: message

                };


                // =============================================
                // SEND TO NODE.JS BACKEND
                // =============================================

                const response = await fetch(
                    "http://localhost:5050/api/connect",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(formData)
                    }
                );


                const result = await response.json();


                // =============================================
                // BACKEND ERROR
                // =============================================

                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to send enquiry."
                    );

                }


                // =============================================
                // SUCCESS
                // =============================================

                console.log(
                    "09ZERO Node.js response:",
                    result
                );


                setConnectStatus(
                    "Thank you! Your enquiry has been received successfully. 🚀",
                    "success"
                );


                // Reset form

                connectForm.reset();


                // Reset service buttons

                serviceButtons.forEach((button) => {
                    button.classList.remove("active");
                });


                // Reset budget buttons

                budgetButtons.forEach((button) => {
                    button.classList.remove("active");
                });


                if (serviceInput) {
                    serviceInput.value = "";
                }

                if (budgetInput) {
                    budgetInput.value = "";
                }


            } catch (error) {

                console.error(
                    "09ZERO Node.js error:",
                    error
                );


                setConnectStatus(
                    "Unable to connect to the server. Please try again.",
                    "error"
                );


            } finally {

                if (connectSubmit) {

                    connectSubmit.disabled = false;

                    connectSubmit.textContent =
                        originalButtonText;

                }

            }

        });

    }


    // =================================================
    // CONSOLE
    // =================================================

    console.log(
        "09ZERO - Connect Page JS Loaded 🚀"
    );

});
