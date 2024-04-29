import Image from "next/image";
import Container from "@/app/components/Container/Container";
import Markdown from "react-markdown";
import { getProject } from "@/app/utils/getProject";

import styles from "./project.module.css";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function Project({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;

    const project = await getProject(slug);

    return (
        <>
            <div className={styles.hero}>
                <Container>
                    <div className={styles.heroContent}>
                        <div className={styles.title}>
                            <div className={styles.projectsLink}>
                                <Link href="/projects">Projects</Link>
                            </div>
                            <h1>{project.title}</h1>
                        </div>
                        <div className={styles.featuredImage}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <Container thin>
                <div className={styles.content}><Markdown>{project.content}</Markdown></div>
            </Container>
        </>
    );
}

export async function generateStaticParams() {
    const projectUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?select=slug`;

    revalidatePath(projectUrl);

    const projectResponse = await fetch(projectUrl, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
    });

    if (!projectResponse.ok) {
        throw new Error("Failed to fetch projects");
    }

    const { data: projects } = await projectResponse.json();

    return projects.map((project: any) => ({
        slug: project.attributes.slug,
    }));
}
