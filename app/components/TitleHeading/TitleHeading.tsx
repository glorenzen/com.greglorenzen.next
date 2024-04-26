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
            backgroundImage: ` url(${backgroundImage}), linear-gradient(to right, rgb(142 171 199 / 70%), rgb(12 50 77 / 70%))`,
            backgroundSize: "cover",
        }}
    >
        <h1>{title}</h1>
    </div>
);

export default TitleHeading;
