import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <h1 className="text-3xl font-bold underline text-color-red">Hello world!</h1>
            <h2>Welcome to My Static App</h2>
            <p>This is the homepage, statically generated with the App Router.</p>
            <Link href="/blog" className="text-blue-600 hover:underline">
                Check out my blog
            </Link>
        </main>
    );
}