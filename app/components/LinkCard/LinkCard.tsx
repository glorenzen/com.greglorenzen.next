import Button from "../Button/Button";

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
        <div>
            <h3>{title}</h3>
            <img src={image} alt={title} />
            <p>{text}</p>
            <Button variant="secondary" href={buttonLink}>
                {buttonText}
            </Button>
        </div>
    );
};

export default LinkCard;
