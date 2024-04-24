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
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
        {
            title: "2020 - Present",
            cardTitle: "Software Engineer at XYZ",
            timelineContent:
                "- Manage all IT/development work.\n- Developed custom experiential marketing applications for clients including Amazon, Bunim Murray Productions, and Dallas Cowboys. Applications were built using modern web technologies including NodeJS and ReactJS.\n- Support design team in developing websites for “Main Street” clients. Development support on websites often includes developing WordPress plugins as well as custom CSS and JS.\n",
        },
        { title: "2018 - 2020", cardTitle: "Junior Developer at ABC" },
    ]);
    const [skills, setSkills] = useState<string[]>([
        "JavaScript",
        "React",
        "Node.js",
    ]);

    // Fetch data from Strapi
    useEffect(() => {
        // Commented out fetch calls to be replaced with actual API calls
        // fetch('/api/title').then(response => response.json()).then(data => setTitle(data));
        // fetch('/api/timelineItems').then(response => response.json()).then(data => setTimelineItems(data));
        // fetch('/api/skills').then(response => response.json()).then(data => setSkills(data));
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
                            <Timeline items={timelineItems} />
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
