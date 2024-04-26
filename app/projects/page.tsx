import styles from "./projects.module.css";
import Image from "next/image";
import React from "react";
import TitleHeading from "../components/TitleHeading/TitleHeading";
import { revalidatePath } from "next/cache";
import Container from "../components/Container/Container";

interface ProjectGridProps {
    projects: { image: string; title: string }[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => (
    <div className={styles.projectGrid}>
        {projects.map((project, index) => (
            <div key={index} className={styles.project}>
                <div className={styles.projectImage}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={1024}
                        height={768}
                       
                    />
                </div>
                <div className={styles.title}>
                    <h2>{project.title}</h2>
                </div>
            </div>
        ))}
    </div>
);

export default async function Projects() {
    const { projects, globalData: global } = await getData();

    return (
        <>
            <TitleHeading
                backgroundImage={`${process.env.NEXT_PUBLIC_SERVER_URL}${global.attributes.titleHeadingBackground.data.attributes.url}`}
                title="Projects"
            />
            <Container>
                <ProjectGrid projects={projects} />
            </Container>
        </>
    );
}

async function getData() {
    const projectUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?populate=featuredImage.image`;
    const globalUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/global?populate=*`;

    revalidatePath(projectUrl);
    revalidatePath(globalUrl);

    const projectResponse = await fetch(projectUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    if (!projectResponse.ok) {
        throw new Error("Failed to fetch projects");
    }

    const globalRes = await fetch(globalUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    const { data: globalData } = await globalRes.json();

    const { data: projects } = await projectResponse.json();

    return {
        projects: projects.map((project: any) => ({
            image: `${process.env.NEXT_PUBLIC_SERVER_URL}${project.attributes.featuredImage.image.data.attributes.url}`,
            title: project.attributes.title,
        })),
        globalData,
    };
}
