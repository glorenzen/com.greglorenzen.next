import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    revalidatePath(request.url);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/home-page?populate=heroBackgroundImage&populate=linkCards&populate=linkCards.button&populate=linkCards.image&populate=linkCards.image.image`,
        {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        }
    );

    const { data } = await response.json();

    return NextResponse.json(data);
}
