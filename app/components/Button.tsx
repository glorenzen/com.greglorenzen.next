import styles from "./Button.module.css";

interface ButtonProps {
    variant: "primary" | "secondary";
    children: React.ReactNode;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, children, href }) => {
    return href ? (
        <a href={href} className={`${styles.button} ${styles[variant]}`}>
            {children}
        </a>
    ) : (
        <button className={`${styles.button} ${styles[variant]}`}>
            {children}
        </button>
    );
};

export default Button;
