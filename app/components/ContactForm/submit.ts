"use server";

import { sendEmail } from "@/app/utils/mailgun";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z
        .string()
        .refine((message) => !/(https?:\/\/[^\s]+)/g.test(message), {
            message: "URLs are not allowed in messages.",
        }),
});

const submit = async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData);

    try {
        // Validate the form data
        schema.parse(rawFormData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return the error messages
            return error.errors;
        }
    }

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

export default submit;
