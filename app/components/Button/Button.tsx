import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
    variant: "primary" | "secondary";
    children: React.ReactNode;
    href?: string;
    alignment?: "left" | "center" | "right";
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    variant,
    children,
    href,
    alignment,
    type = "button",
}) => {
    return href ? (
        <div
            className={`${styles.buttonWrapper} ${
                alignment ? styles[alignment] : "left"
            }`}
        >
            <Link href={href}>
                <div className={`${styles.button} ${styles[variant]}`}>
                    {children}
                </div>
            </Link>
        </div>
    ) : (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]} ${
                alignment ? styles[alignment] : "left"
            }`}
        >
            {children}
        </button>
    );
};

export default Button;
