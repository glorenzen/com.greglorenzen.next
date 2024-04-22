import Link from "next/link";
import Button from "../Button/Button";
import styles from "./LinkCard.module.css";
import Image from "next/image";

interface LinkCardProps {
    title: string;
    image: string;
    text: string;
    buttonLink: string;
    buttonText: string;
    width: number;
    height: number;
}

const LinkCard: React.FC<LinkCardProps> = ({
    title,
    image,
    text,
    buttonLink,
    buttonText,
    width,
    height,
}) => {
    return (
        <Link href={buttonLink} className={styles.linkCard}>
            <h3 className={styles.title}>{title}</h3>
            <Image src={image} alt={title} height={height} width={width} />
            <p>{text}</p>
            <div className={styles.button}>
                <Button variant="secondary">{buttonText}</Button>
            </div>
        </Link>
    );
};

export default LinkCard;
