"use client";

// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Timeline, { TimelineItem } from "../components/Timeline/Timeline";
import styles from "./resume.module.css";

export default function Resume() {
    // Create state variables with placeholder data
    const [title, setTitle] = useState("Resume");
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>();
    const [skills, setSkills] = useState<string[]>([
        "JavaScript",
        "React",
        "Node.js",
    ]);

    // Fetch data from Strapi
    useEffect(() => {
        fetch("/api/jobs")
            .then((response) => response.json())
            .then((data) =>
                setTimelineItems(
                    data.map((item: any) => ({
                        title: item.attributes.dates,
                        cardTitle: item.attributes.companyName,
                        cardSubtitle: item.attributes.jobTitle,
                        timelineContent: item.attributes.jobDescription,
                    }))
                )
            );
    }, []);

    return (
        <div>
            <Header />
            <div className={styles.hero}>
                <h1>{title}</h1>
            </div>
            <main className={styles.resume}>
                <Container wide>
                    <div className={styles.grid}>
                        <div className={styles.timeline}>
                            <h2>Resume</h2>
                            {timelineItems ? <Timeline items={timelineItems} /> : null}
                        </div>
                        <div className={styles.skills}>
                            <h2>Skills</h2>
                            <ul>
                                {skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
