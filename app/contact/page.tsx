import TitleHeading from "../components/TitleHeading/TitleHeading";
import ContactForm from "../components/ContactForm/ContactForm";
import styles from "./contact.module.css";
import { getGlobal } from "../utils/getGlobal";
import Container from "../components/Container/Container";
import { getContactPage } from "../utils/getContactPage";

export default async function Contact() {
    const {
        globalData: { titleHeadingBackground },
        contactPageData: { heading, ctaText },
    } = await getData();

    return (
        <div className={styles.contact}>
            <TitleHeading
                backgroundImage={`${process.env.NEXT_PUBLIC_SERVER_URL}${titleHeadingBackground}`}
                title="Contact"
            />
            <Container>
                <div className={styles.twoColumn}>
                    <div className={styles.leftColumn}>
                        <h1>{heading}</h1> {/* Set the heading value */}
                        <p>{ctaText}</p>
                    </div>
                    <div className={styles.rightColumn}>
                        <ContactForm />
                    </div>
                </div>
            </Container>
        </div>
    );
}

async function getData() {
    const globalData = await getGlobal();
    const contactPageData = await getContactPage();

    return {
        globalData,
        contactPageData,
    };
}
