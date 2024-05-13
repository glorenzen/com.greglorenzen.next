import React from "react";
import TitleHeading from "../components/TitleHeading/TitleHeading";
import { getGlobal } from "../utils/getGlobal";
import Container from "../components/Container/Container";
import { getThankYouPage } from "../utils/getThankYouPage";

export default async function ThankYou() {
    const {
        globalData: { titleHeadingBackground },
        thankYouPageData: { heading, thankYouText },
    } = await getData();

    return (
        <div>
            <TitleHeading
                title={heading}
                backgroundImage={`${process.env.NEXT_PUBLIC_SERVER_URL}${titleHeadingBackground}`}
            />
            <Container>
                <div>{thankYouText}</div>
            </Container>
        </div>
    );
}

async function getData() {
    const globalData = await getGlobal();
    const thankYouPageData = await getThankYouPage();

    return {
        globalData,
        thankYouPageData,
    };
}
