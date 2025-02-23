import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import './post.css';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-4xl mx-auto py-8 px-4">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-gray-600">{post.date}</div>
            </header>
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.description,
    };
}