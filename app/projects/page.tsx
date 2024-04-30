import styles from "./projects.module.css";
import Image from "next/image";
import React from "react";
import TitleHeading from "../components/TitleHeading/TitleHeading";
import { revalidatePath } from "next/cache";
import Container from "../components/Container/Container";
import Link from "next/link";
import { getGlobal } from "../utils/getGlobal";

interface ProjectGridProps {
    projects: { image: string; title: string; slug: string }[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => (
    <div className={styles.projectGrid}>
        {projects.map((project, index) => (
            <div key={index}>
                <Link
                    href={`/projects/${project.slug}`}
                    className={styles.projectLink}
                >
                    <div className={styles.projectCard}>
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
                </Link>
            </div>
        ))}
    </div>
);

export default async function Projects() {
    const {
        projects,
        globalData: { titleHeadingBackground },
    } = await getData();

    return (
        <>
            <TitleHeading
                backgroundImage={`${process.env.NEXT_PUBLIC_SERVER_URL}${titleHeadingBackground}`}
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

    revalidatePath(projectUrl);

    const projectResponse = await fetch(projectUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    if (!projectResponse.ok) {
        throw new Error("Failed to fetch projects");
    }

    const globalData = await getGlobal();

    const { data: projects } = await projectResponse.json();

    return {
        projects: projects.map((project: any) => ({
            image: `${process.env.NEXT_PUBLIC_SERVER_URL}${project.attributes.featuredImage.image.data.attributes.url}`,
            title: project.attributes.title,
            slug: project.attributes.slug,
        })),
        globalData,
    };
}
