import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <div className="space-y-8">
                {posts.map((post) => (
                    <article key={post.slug} className="border-b pb-8">
                        <Link href={`/blog/${post.slug}`}>
                            <h2 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                                {post.title}
                            </h2>
                        </Link>
                        <p className="text-gray-600 mb-2">{post.date}</p>
                        <p className="text-gray-800">{post.description}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}