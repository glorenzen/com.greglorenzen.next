"use client"

import React from "react";
import { Chrono } from "react-chrono";

export interface TimelineItem {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    cardDetailedText: string;
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
    const timelineItems = items.map((item) => ({
        title: item.title,
        cardTitle: item.cardTitle,
        cardSubtitle: item.cardSubtitle,
        cardDetailedText: item.cardDetailedText,
    }));

    return (
        <div style={{ width, height }}>
            <Chrono items={timelineItems} mode={mode} slideShow />
        </div>
    );
};

export default Timeline;
