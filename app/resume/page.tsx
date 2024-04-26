// Import necessary libraries and components
import React from "react";
import Container from "../components/Container/Container";
import styles from "./resume.module.css";
import Markdown from "react-markdown";
import TitleHeading from "../components/TitleHeading/TitleHeading";
import { revalidatePath } from "next/cache";

interface ExperienceItem {
    dates: string;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
}

interface Data {
    experienceItems: ExperienceItem[];
    skills: string[];
    globalData: any;
}

export default async function Resume() {
    const data = await getData();

    const { experienceItems, skills, globalData: global } = data;

    return (
        <div>
            <TitleHeading
                title="Resume"
                backgroundImage={`${process.env.NEXT_PUBLIC_SERVER_URL}${global.attributes.titleHeadingBackground.data.attributes.url}`}
                
            />
            <main className={styles.resume}>
                <Container>
                    <div className={styles.grid}>
                        <div className={styles.experience}>
                            <h2>Experience</h2>
                            {experienceItems
                                ? experienceItems.map(
                                      (item: ExperienceItem, index: number) => (
                                          <div key={index}>
                                              <h3>{item.companyName}</h3>
                                              <h4>{item.jobTitle}</h4>
                                              <p>{item.dates}</p>
                                              <Markdown>
                                                  {item.jobDescription}
                                              </Markdown>
                                          </div>
                                      )
                                  )
                                : null}
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
        </div>
    );
}

async function getData(): Promise<Data> {
    const jobUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs?populate=jobDescription`;
    const globalUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/global?populate=*`;

    revalidatePath(jobUrl);
    revalidatePath(globalUrl);

    const jobsRes = await fetch(jobUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const globalRes = await fetch(globalUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const { data: globalData } = await globalRes.json();

    const { data: jobData } = await jobsRes.json();

    return {
        experienceItems: jobData.map((job: any) => ({ ...job.attributes })),
        skills: ["Javascript", "NodeJS", "React"],
        globalData,
    };
}
