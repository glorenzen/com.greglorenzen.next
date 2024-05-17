import { revalidatePath } from "next/cache";

export const getPerson = async () => {
    const personUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/greg-lorenzen?populate[0]=greg&populate[1]=greg.photo&populate[2]=greg.photo.image&populate[3]=greg.skills`;

    // Revalidate the paths
    revalidatePath(personUrl);

    // Fetch data from Strapi
    const personRes = await fetch(personUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const {
        data: {
            attributes: { greg },
        },
    } = await personRes.json();

    return greg;
};
