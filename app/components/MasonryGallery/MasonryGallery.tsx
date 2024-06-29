"use client";

import {
    faSearchPlus,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./MasonryGallery.module.css";

interface MasonryGalleryProps {
    images: { url: string; alt: string }[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
    const [lightbox, setLightbox] = useState<{
        url: string;
        alt: string;
    } | null>(null);

    // State to track current image index
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const openLightbox = (
        image: { url: string; alt: string },
        index: number
    ) => {
        setLightbox(image);
        setCurrentIndex(index);
    };

    const closeLightbox = () => {
        setLightbox(null);
    };

    // Function to navigate images
    const navigateImages = (direction: "next" | "prev") => {
        if (currentIndex !== null) {
            const newIndex =
                direction === "next"
                    ? (currentIndex + 1) % images.length
                    : (currentIndex - 1 + images.length) % images.length;
            setCurrentIndex(newIndex);
            setLightbox(images[newIndex]);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                navigateImages("next");
            } else if (e.key === "ArrowLeft") {
                navigateImages("prev");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, images]);

    return (
        <>
            <div className={styles.masonry}>
                {images.map((image, index) => (
                    <div
                        className={styles.masonryItem}
                        key={index}
                        onClick={() => openLightbox(image, index)}
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
                <div
                    className={styles.lightboxOverlay}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeLightbox();
                        }
                    }}
                >
                    <img
                        src={lightbox.url}
                        alt={lightbox.alt}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div
                        className={`${styles.arrow} ${styles.leftArrow}`}
                        onClick={(e) => {
                            navigateImages("prev");
                            e.stopPropagation();
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div
                        className={`${styles.arrow} ${styles.rightArrow}`}
                        onClick={(e) => {
                            navigateImages("next");
                            e.stopPropagation();
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MasonryGallery;
