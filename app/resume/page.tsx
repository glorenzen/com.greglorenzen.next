import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./resume.module.css";

export default function Resume() {
    return (
        <div>
            <Header />
            <main className={styles.resume}>
                <Container>
                    <h1>Resume</h1>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
