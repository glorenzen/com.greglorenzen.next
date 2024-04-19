import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    revalidatePath(request.url);
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/greg-lorenzen?populate[0]=greg&populate[1]=greg.photo&populate[2]=greg.photo.image`,
        {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        }
    );

    const { data } = await response.json();

    return NextResponse.json(data);
}
