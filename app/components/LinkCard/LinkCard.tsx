import Link from "next/link";
import Button from "../Button/Button";
import styles from "./LinkCard.module.css";

interface LinkCardProps {
    title: string;
    image: string;
    text: string;
    buttonLink: string;
    buttonText: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
    title,
    image,
    text,
    buttonLink,
    buttonText,
}) => {
    return (
        <Link href={buttonLink} className={styles.linkCard}>
            <h3 className={styles.title}>{title}</h3>
            <img src={image} alt={title} />
            <p>{text}</p>
            <Button variant="secondary">{buttonText}</Button>
        </Link>
    );
};

export default LinkCard;
