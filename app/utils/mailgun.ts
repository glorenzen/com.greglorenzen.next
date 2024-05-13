import formData from "form-data";
import Mailgun, { MailgunMessageData } from "mailgun.js";

const createMGClient = () => {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: process.env.MAILGUN_USERNAME as string,
        key: process.env.MAILGUN_API_KEY as string,
    });
    return mg;
};

export const sendEmail = async (data: MailgunMessageData) => {
    // Create the Mailgun client
    const mg = createMGClient();

    try {
        // Send the email using the Mailgun send method
        const response = await mg.messages.create(
            process.env.MAILGUN_DOMAIN as string,
            data
        );
        console.log("Email sent:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
