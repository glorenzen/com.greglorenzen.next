import { revalidatePath } from "next/cache";

export async function getProject(slug: string) {
    const projectUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?filters[slug][$eq]=${slug}&populate=featuredImage.image&populate=gallery.image`;

    revalidatePath(projectUrl);

    const projectResponse = await fetch(projectUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    if (!projectResponse.ok) {
        throw new Error("Failed to fetch project");
    }

    const { data: projects } = await projectResponse.json();

    return {
        image: `${process.env.NEXT_PUBLIC_SERVER_URL}${projects[0].attributes.featuredImage.image.data.attributes.url}`,
        title: projects[0].attributes.title,
        content: projects[0].attributes.content,
        gallery: projects[0].attributes.gallery
    };
}
