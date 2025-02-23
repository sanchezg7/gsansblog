import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
        fileNames.map(async (fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const { data, content } = matter(fileContents);
            const processedContent = await remark()
                .use(html)
                .process(content);
            const contentHtml = processedContent.toString();

            return {
                slug,
                content: contentHtml,
                ...(data as { title: string; date: string; description: string }),
            };
        })
    );

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data, content } = matter(fileContents);
        const processedContent = await remark()
            .use(html)
            .process(content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            content: contentHtml,
            ...(data as { title: string; date: string; description: string }),
        };
    } catch {
        return null;
    }
}