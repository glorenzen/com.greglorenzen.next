import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";
import Container from "../Container/Container";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footerContent}>
                    <p>
                        <FontAwesomeIcon icon={faCopyright} /> {year} Greg
                        Lorenzen
                    </p>
                    <a
                        href="https://github.com/glorenzen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.github}
                    >
                        <FontAwesomeIcon icon={faGithub} size="xl" />
                    </a>
                </div>
            </Container>
        </footer>
    );
}
