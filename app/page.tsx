import Container from "./components/Container/Container";
import styles from "./page.module.css";
import Button from "./components/Button/Button";
import LinkCard from "./components/LinkCard/LinkCard";
import Image from "next/image";
import { revalidatePath } from "next/cache";

interface Hero {
    name: string;
    jobTitle: string;
    backgroundImage: string;
}

interface About {
    image: string;
    bio: string;
}

interface LinkCard {
    title: string;
    image: string;
    text: string;
    buttonText: string;
    buttonLink: string;
}

interface Data {
    hero: Hero;
    about: About;
    linkCards: LinkCard[];
}

export default async function Home() {
    const data = await getData();

    return data ? (
        <div>
            <main className={styles.home}>
                <section
                    className={styles.hero}
                    style={{
                        background: `url(${data.hero.backgroundImage}), linear-gradient(135deg, rgba(131, 174, 228, 1.0), rgba(24, 50, 83, 1.0))`,
                        backgroundSize: "cover",
                    }}
                >
                    <Container>
                        <div className={styles.heroContent}>
                            <h1 className={styles.name}>{data.hero.name}</h1>
                            <h2 className={styles.title}>
                                {data.hero.jobTitle}
                            </h2>
                            <Button
                                variant="primary"
                                href="/resume"
                                alignment="center"
                            >
                                Resume
                            </Button>
                        </div>
                    </Container>
                </section>
                <Container>
                    <section className={styles.about}>
                        <Image
                            src={data.about.image}
                            width={200}
                            height={200}
                            alt={data.hero.name}
                        />
                        <p className={styles.bio}>{data.about.bio}</p>
                    </section>
                    <section className={styles.linkCards}>
                        {data.linkCards.map((card, index) => (
                            <LinkCard
                                key={index}
                                title={card.title}
                                image={card.image}
                                text={card.text}
                                buttonLink={card.buttonLink}
                                buttonText={card.buttonText}
                                width={100}
                                height={100}
                            />
                        ))}
                    </section>
                </Container>
            </main>
        </div>
    ) : null;
}

async function getData(): Promise<Data> {
    // Define the URLs
    const homePageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/home-page?populate=heroBackgroundImage&populate=linkCards&populate=linkCards.button&populate=linkCards.image&populate=linkCards.image.image`;
    const personUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/greg-lorenzen?populate[0]=greg&populate[1]=greg.photo&populate[2]=greg.photo.image`;

    // Revalidate the paths
    revalidatePath(homePageUrl);
    revalidatePath(personUrl);

    // Fetch data from Strapi
    const homeRes = await fetch(homePageUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const {
        data: {
            attributes: { heroBackgroundImage, linkCards: homeLinkCards },
        },
    } = await homeRes.json();

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

    const hero = {
        name: greg.name,
        jobTitle: greg.title,
        backgroundImage: `${process.env.NEXT_PUBLIC_SERVER_URL}${heroBackgroundImage.data.attributes.url}`,
    };
    const about = {
        image: `${process.env.NEXT_PUBLIC_SERVER_URL}${greg.photo.image.data.attributes.formats.medium.url}`,
        bio: greg.bio,
    };

    const linkCards: LinkCard[] = homeLinkCards.map((card: any) => ({
        title: card.title as string,
        image: `${process.env.NEXT_PUBLIC_SERVER_URL}${card.image.image.data.attributes.url}`,
        text: card.description as string,
        buttonText: card.button.text,
        buttonLink: card.button.url,
    }));

    const data = { hero, about, linkCards };

    return data;
}
