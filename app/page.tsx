import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";
import styles from "./page.module.css";
import Button from "./components/Button";

export default async function Home() {
    const { hero, about, linkCards } = await getData();

    return (
        <div>
            <Header />
            <main>
                <Container>
                    <section
                        className={styles.hero}
                        style={{
                            backgroundImage: `url(${hero.backgroundImage})`,
                        }}
                    >
                        <h1 className={styles.name}>{hero.name}</h1>
                        <h2 className={styles.title}>{hero.jobTitle}</h2>
                        <Button variant="primary" href="/resume">
                            Resume
                        </Button>
                    </section>
                    <section className={styles.about}>
                        <img src={about.image} alt="About me" />
                        <p className={styles.bio}>{about.bio}</p>
                    </section>
                    <section>
                        {linkCards.map((card, index) => (
                            <div key={index}>
                                <h3>{card.title}</h3>
                                <img src={card.image} alt={card.title} />
                                <p>{card.text}</p>
                                <Button
                                    variant="secondary"
                                    href={card.buttonLink}
                                >
                                    {card.buttonText}
                                </Button>
                            </div>
                        ))}
                    </section>
                </Container>
            </main>
            <Footer />
        </div>
    );
}

// Placeholder function to simulate fetching data from Strapi CMS
export async function getData() {
    // Replace these with your actual Strapi CMS calls
    const hero = {
        name: "Your Name",
        jobTitle: "Your Job Title",
        backgroundImage: "/path/to/background.jpg",
    };
    const about = {
        image: "/path/to/image.jpg",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. At urna condimentum mattis pellentesque. Dolor sit amet consectetur adipiscing. Blandit turpis cursus in hac. Nec tincidunt praesent semper feugiat nibh. Viverra suspendisse potenti nullam ac tortor vitae. Netus et malesuada fames ac turpis egestas maecenas. Lacinia at quis risus sed. Enim nunc faucibus a pellentesque sit amet porttitor eget. Massa id neque aliquam vestibulum morbi. Augue eget arcu dictum varius duis.",
    };
    const linkCards = [
        {
            title: "Card 1",
            image: "/path/to/image1.jpg",
            text: "Text 1",
            buttonText: "Button 1",
            buttonLink: "/link1",
        },
        {
            title: "Card 2",
            image: "/path/to/image2.jpg",
            text: "Text 2",
            buttonText: "Button 2",
            buttonLink: "/link2",
        },
        {
            title: "Card 3",
            image: "/path/to/image3.jpg",
            text: "Text 3",
            buttonText: "Button 3",
            buttonLink: "/link3",
        },
    ];

    return { hero, about, linkCards };
}
