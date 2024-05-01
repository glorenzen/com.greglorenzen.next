import TitleHeading from "../components/TitleHeading/TitleHeading";
import { getGlobal } from "../utils/getGlobal";

export default async function Contact() {
    const {
        globalData: { titleHeadingBackground },
    } = await getData();

    return (
        <>
            <TitleHeading
                backgroundImage={`${process.env.NEXT_PUBLIC_SERVER_URL}${titleHeadingBackground}`}
                title="Contact"
            />
        </>
    );
}

async function getData() {
    const globalData = await getGlobal();

    return {
        globalData,
    };
}
