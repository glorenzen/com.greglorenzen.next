"use client";

import { useState, useEffect } from "react";
import Container from "../Container/Container";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export interface NavItem {
    text: string;
    link: string;
}

export interface Logo {
    alt: string;
    url: string;
}

interface HeaderProps {
    navItems: NavItem[];
    logo: Logo;
}

export default function Header() {
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [logo, setLogo] = useState<Logo | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const pathName = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setNavItems(data.navItems);
            setLogo(data.logo);
        };

        fetchData();
    }, []);

    const handleHamburgerClick = () => {
        setIsMobileMenuOpen(true);
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    const renderNavItems = (items: NavItem[]) =>
        items.map((item, index) => (
            <li
                key={index}
                className={pathName == item.link ? styles.active : ""}
            >
                <a href={item.link}>{item.text}</a>
            </li>
        ));

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.menuContainer}>
                    <div className={styles.logo}>
                        {logo && <img src={logo.url} alt={logo.alt} />}
                    </div>
                    <nav>
                        <ul>{renderNavItems(navItems)}</ul>
                    </nav>
                    <button
                        className={styles.hamburger}
                        onClick={handleHamburgerClick}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {isMobileMenuOpen && (
                        <div className={styles.overlay}>
                            <button
                                className={styles.close}
                                onClick={handleMobileMenuClose}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <div className={styles.hamburgerMenu}>
                                <ul>{renderNavItems(navItems)}</ul>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
}

async function getData(): Promise<HeaderProps> {
    const res = await fetch("/api/header");

    const {
        attributes: {
            logo: {
                altText: logoAltText,
                image: {
                    data: {
                        attributes: { url: logoUrl },
                    },
                },
            },
        },
    } = await res.json();

    // Replace these with your actual Strapi CMS calls
    const navItems: NavItem[] = [
        { text: "Home", link: "/" },
        { text: "Contact", link: "/contact" },
        { text: "Projects", link: "/projects" },
        { text: "Resume", link: "/resume" },
    ];

    const logo: Logo = {
        alt: logoAltText,
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}${logoUrl}`,
    };

    return { navItems, logo };
}
