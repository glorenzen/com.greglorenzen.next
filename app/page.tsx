import Header from "./components/Header";
import Footer from "./components/Footer";

export default async function Home() {
    const { hero, about, linkCards } = await getData();

    return (
        <div>
            <Header />
            <main>
                <section>
                    <h1>{hero.name}</h1>
                    <h2>{hero.jobTitle}</h2>
                </section>
                <section>
                    <img src={about.image} alt="About me" />
                    <p>{about.bio}</p>
                </section>
                <section>
                    {linkCards.map((card, index) => (
                        <div key={index}>
                            <h3>{card.title}</h3>
                            <img src={card.image} alt={card.title} />
                            <p>{card.text}</p>
                            <a href={card.buttonLink}>{card.buttonText}</a>
                        </div>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}

// Placeholder function to simulate fetching data from Strapi CMS
export async function getData() {
    // Replace these with your actual Strapi CMS calls
    const hero = { name: "Your Name", jobTitle: "Your Job Title" };
    const about = { image: "/path/to/image.jpg", bio: "Your bio" };
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
