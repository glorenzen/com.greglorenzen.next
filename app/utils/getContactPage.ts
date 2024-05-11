import { revalidatePath } from "next/cache";

export const getContactPage = async () => {
    const contactUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-page`;

    revalidatePath(contactUrl);

    const contactPageRes = await fetch(contactUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const { data: contactPageData } = await contactPageRes.json();
    const heading = contactPageData?.attributes?.heading ?? "";
    const ctaText = contactPageData?.attributes?.ctaText ?? "";

    return {
        heading,
        ctaText,
    };
};
