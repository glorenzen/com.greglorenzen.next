import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/header?populate[logo][populate]=*`,
        {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        }
    );

    const { data } = await response.json();

    return NextResponse.json(data);
}
