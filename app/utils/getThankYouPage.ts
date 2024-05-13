import { revalidatePath } from "next/cache";

export const getThankYouPage = async () => {
    const thankYouUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/thank-you-page`;

    revalidatePath(thankYouUrl);

    const thankYouPageRes = await fetch(thankYouUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const { data: thankYouPageData } = await thankYouPageRes.json();
    const heading = thankYouPageData?.attributes?.heading ?? "";
    const thankYouText = thankYouPageData?.attributes?.thankYouText ?? "";

    return {
        heading,
        thankYouText,
    };
};
