"use client";

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../Button/Button";
import styles from "./ContactForm.module.css";
import handleSubmit from "./handleSubmit";

const ContactForm: React.FC = () => {
    return (
        <form className={styles.contactForm} action={handleSubmit}>
            <div className={styles.row}>
                <div className={styles.formField}>
                    <label htmlFor="firstName">
                        First Name <span className={styles.required}>*</span>
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="lastName">
                        Last Name <span className={styles.required}>*</span>
                    </label>
                    <input id="lastName" name="lastName" type="text" required />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formField}>
                    <label htmlFor="email">
                        Email <span className={styles.required}>*</span>
                    </label>
                    <input id="email" name="email" type="email" required />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="phone">
                        Phone <span className={styles.required}>*</span>
                    </label>
                    <input id="phone" name="phone" type="tel" required />
                </div>
            </div>

            <div className={styles.formField}>
                <label htmlFor="message">
                    Message <span className={styles.required}>*</span>
                </label>
                <textarea id="message" name="message" required />
            </div>

            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={(value) => {
                    const element = document.getElementById(
                        "recaptchaResponse"
                    ) as HTMLInputElement;
                    if (element) {
                        element.value = value ?? "";
                    }
                }}
                style={{ marginBottom: "30px" }}
            />

            <input
                type="hidden"
                id="recaptchaResponse"
                name="recaptchaResponse"
            />

            <Button type="submit" variant="primary">
                Submit
            </Button>
        </form>
    );
};

export default ContactForm;
