import React from "react";
import Image from "next/image";
import styles from "./MasonryGallery.module.css";

interface MasonryGalleryProps {
    images: { url: string; alt: string }[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
    return (
        <div className={styles.masonry}>
            {images.map((image, index) => (
                <div className={styles.masonryItem}>
                    <Image
                        key={index}
                        src={image.url}
                        width={0}
                        height={0}
                        alt={image.alt}
                        sizes="100vw"
                    />
                </div>
            ))}
        </div>
    );
};

export default MasonryGallery;
