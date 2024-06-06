"use client";

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../Button/Button";
import styles from "./ContactForm.module.css";
import submit from "./submit";
import { ZodIssue } from "zod";

const ContactForm: React.FC = () => {
    const [errors, setErrors] = useState<ZodIssue[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setSubmitted(true);
        const res = await submit(formData);

        // If we get a response, there was an error
        setErrors(res);
    };

    const getErrorMessage = (field: string) => {
        if (!errors) {
            return null;
        }

        const error = errors.find((err) => err.path[0] === field);
        return error ? error.message : null;
    };

    return (
        <form className={styles.contactForm} action={handleSubmit}>
            <div className={styles.row}>
                <div className={styles.formField}>
                    {submitted && getErrorMessage("firstName") && (
                        <div className={styles.errorMessage}>
                            {getErrorMessage("firstName")}
                        </div>
                    )}
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
                    {submitted && getErrorMessage("lastName") && (
                        <div className={styles.errorMessage}>
                            {getErrorMessage("lastName")}
                        </div>
                    )}
                    <label htmlFor="lastName">
                        Last Name <span className={styles.required}>*</span>
                    </label>
                    <input id="lastName" name="lastName" type="text" required />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formField}>
                    {submitted && getErrorMessage("email") && (
                        <div className={styles.errorMessage}>
                            {getErrorMessage("email")}
                        </div>
                    )}
                    <label htmlFor="email">
                        Email <span className={styles.required}>*</span>
                    </label>
                    <input id="email" name="email" type="email" required />
                </div>

                <div className={styles.formField}>
                    {submitted && getErrorMessage("phone") && (
                        <div className={styles.errorMessage}>
                            {getErrorMessage("phone")}
                        </div>
                    )}
                    <label htmlFor="phone">
                        Phone <span className={styles.required}>*</span>
                    </label>
                    <input id="phone" name="phone" type="tel" required />
                </div>
            </div>

            <div className={styles.formField}>
                {submitted && getErrorMessage("message") && (
                    <div className={styles.errorMessage}>
                        {getErrorMessage("message")}
                    </div>
                )}
                <label htmlFor="message">
                    Message <span className={styles.required}>*</span>
                </label>
                <textarea id="message" name="message" required />
            </div>

            <div className={`${styles.formField} ${styles.faxNumber}`}>
                <label htmlFor="faxNumber">Fax Number</label>
                <input id="faxNumber" name="faxNumber" type="text" tabIndex={-1} autoComplete="nope"/>
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
