import { getAllPosts, getPostBySlug } from '@/lib/posts';

// This is the required function
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Default export for the page component
export default async function BlogPost({
                                           params,
                                       }: {
    params: { slug: string };
}) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);


    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <div>{post.date}</div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}