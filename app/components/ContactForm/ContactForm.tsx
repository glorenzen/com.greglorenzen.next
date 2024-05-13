import React from "react";
import styles from "./ContactForm.module.css";
import { sendEmail } from "../../utils/mailgun";

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
                Message: ${rawFormData.message}
            `,
            'h:Reply-To': rawFormData.email as string
        });

        // Send email to the user
        await sendEmail({
            to: rawFormData.email as string,
            from: `Greg Lorenzen <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            subject: "Thanks for reaching out!",
            text: "I've received your email and I will get back to you as soon as possible!",
            'h:Reply-To': 'gregorylorenzen@gmail.com'
        });
    };

    return (
        <form className={styles.contactForm} action={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" />

            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactForm;
