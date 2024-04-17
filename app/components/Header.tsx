import Container from "./Container";
import styles from "./Header.module.css";

interface NavItem {
    text: string;
    link: string;
}

interface Logo {
    alt: string;
    url: string;
}

interface HeaderProps {
    navItems: NavItem[];
    logo: Logo;
}

export default async function Header() {
    const { navItems, logo } = await getData();

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.menuContainer}>
                    <div className={styles.logo}>
                        {logo && <img src={logo.url} alt={logo.alt} />}
                    </div>
                    <nav>
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link}>{item.text}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={styles.hamburgerMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </Container>
        </header>
    );
}

// Placeholder function to simulate fetching data from Strapi CMS
export async function getData(): Promise<HeaderProps> {
    // Replace these with your actual Strapi CMS calls
    const navItems: NavItem[] = [
        { text: "Home", link: "/" },
        { text: "Contact", link: "/contact" },
        { text: "Projects", link: "/projects" },
        { text: "Resume", link: "/resume" },
    ];
    const logo: Logo = { alt: "Logo", url: "/path/to/logo.png" };

    return { navItems, logo };
}
