import React from "react";
import styles from "./TitleHeading.module.css";

interface TitleHeadingProps {
    backgroundImage: string;
    title: string;
}

const TitleHeading: React.FC<TitleHeadingProps> = ({
    backgroundImage,
    title,
}) => (
    <div
        className={styles.titleHeading}
        style={{
            backgroundImage: ` url(${backgroundImage}), linear-gradient(to right, var(--primary-color-light), var(--primary-color))`,
            backgroundSize: "cover",
        }}
    >
        <h1>{title}</h1>
    </div>
);

export default TitleHeading;
