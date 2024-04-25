"use client";

import React from "react";
import { Chrono } from "react-chrono";
import Markdown from "react-markdown";
import styles from "./Timeline.module.css";

export interface TimelineItem {
    title: string;
    cardTitle: string;
    cardSubtitle?: string;
    cardDetailedText?: string;
    timelineContent?: string;
}

interface TimelineProps {
    items: TimelineItem[];
    mode?: "HORIZONTAL" | "VERTICAL" | "VERTICAL_ALTERNATING";
    width?: string;
    height?: string;
}

const Timeline: React.FC<TimelineProps> = ({
    items,
    mode = "VERTICAL",
    width = "100%",
    height = "100%",
}) => {
    // Define theme object with branding colors
    const theme = {
        primary: "var(--primary-color-light)",
        secondary: "var(--secondary-color)",
        titleColor: "var(--primary-color)",
        cardTitleColor: "var(--dark-color)",
    };

    return (
        <div style={{ width, height }} className={styles.timeline}>
            <Chrono
                items={items.map((item, index) => ({
                    title: item.title,
                }))}
                mode={mode}
                useReadMore={false}
                theme={theme}
                disableInteraction
                disableToolbar
                cardHeight={400}
            >
                {items.map((item, index) => (
                    <div key={index} className={styles.timelineItem}>
                        <h3>{item.cardTitle}</h3>
                        <p>{item.cardSubtitle}</p>
                        <Markdown>{item.timelineContent}</Markdown>
                    </div>
                ))}
            </Chrono>
        </div>
    );
};

export default Timeline;
