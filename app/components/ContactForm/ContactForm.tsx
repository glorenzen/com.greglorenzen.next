import React from "react";
import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
    return (
        <form className={styles.contactForm}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" />

            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" />

            <label htmlFor="message">Message</label>
            <textarea id="message" />
        </form>
    );
};

export default ContactForm;
