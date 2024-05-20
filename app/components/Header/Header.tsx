"use client";

import { useState, useEffect } from "react";
import Container from "../Container/Container";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

const logo: Logo = {
    alt: "Greg Lorenzen Logo",
    url: "/img/greg-lorenzen-logo.svg",
};

const navItems: NavItem[] = [
    { text: "Home", link: "/" },
    { text: "Contact", link: "/contact" },
    { text: "Projects", link: "/projects" },
    { text: "Resume", link: "/resume" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const pathName = usePathname();

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
                        {logo && (
                            <Image
                                src={logo.url}
                                alt={logo.alt}
                                width={75}
                                height={75}
                            />
                        )}
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
