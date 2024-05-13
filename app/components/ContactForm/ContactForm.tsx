import React from "react";
import styles from "./ContactForm.module.css";
import { sendEmail } from "../../utils/mailgun";
import { redirect } from "next/navigation";
import Button from "../Button/Button";

const ContactForm: React.FC = () => {
    const handleSubmit = async (formData: FormData) => {
        "use server";

        const rawFormData = Object.fromEntries(formData);

        // Send notification email to admin
        await sendEmail({
            to: process.env.ADMIN_EMAIL as string,
            from: `Greg Lorenzen Website <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            subject: "New contact form submission (greglorenzen.com)",
            text: `
                New contact form submission from greglorenzen.com:
                Name: ${rawFormData.firstName} ${rawFormData.lastName}
                Email: ${rawFormData.email}
                Phone: ${rawFormData.phone}
                Message: ${rawFormData.message}
            `,
            "h:Reply-To": rawFormData.email as string,
        });

        // Send email to the user
        await sendEmail({
            to: rawFormData.email as string,
            from: `Greg Lorenzen <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            subject: "Thanks for reaching out!",
            text: "I've received your email and I will get back to you as soon as possible!",
            "h:Reply-To": "gregorylorenzen@gmail.com",
        });

        // Redirect to the thank you page
        redirect("/thank-you");
    };

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

            <Button type="submit" variant="primary">
                Submit
            </Button>
        </form>
    );
};

export default ContactForm;
