"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./MasonryGallery.module.css";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MasonryGalleryProps {
    images: { url: string; alt: string }[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
    const [lightbox, setLightbox] = useState<{
        url: string;
        alt: string;
    } | null>(null);

    const openLightbox = (image: { url: string; alt: string }) => {
        setLightbox(image);
    };

    const closeLightbox = () => {
        setLightbox(null);
    };

    return (
        <>
            <div className={styles.masonry}>
                {images.map((image, index) => (
                    <div
                        className={styles.masonryItem}
                        key={index}
                        onClick={() => openLightbox(image)}
                    >
                        <Image
                            src={image.url}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt={image.alt}
                        />
                        <div className={styles.iconOverlay}>
                            <FontAwesomeIcon icon={faSearchPlus} />
                        </div>
                    </div>
                ))}
            </div>
            {lightbox && (
                <div className={styles.lightboxOverlay} onClick={closeLightbox}>
                    <img src={lightbox.url} alt={lightbox.alt} />
                </div>
            )}
        </>
    );
};

export default MasonryGallery;
