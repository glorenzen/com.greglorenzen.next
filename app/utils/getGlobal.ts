import { revalidatePath } from "next/cache";

export const getGlobal = async () => {
    const globalUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/global?populate=*`;

    revalidatePath(globalUrl);

    const globalRes = await fetch(globalUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const { data: globalData } = await globalRes.json();
    const titleHeadingBackground =
        globalData?.attributes?.titleHeadingBackground?.data?.attributes.url ??
        "";

    return {
        titleHeadingBackground,
    };
};
