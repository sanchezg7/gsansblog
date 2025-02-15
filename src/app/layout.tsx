import React from 'react';
import './global.css';

export const metadata = {
    title: 'My SSG Next.js Site with App Router',
    description: 'This is a static Next.js app using the App Router.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <header>
            <h1>Static Next.js App with App Router</h1>
        </header>
        {children}
        </body>
        </html>
    );
}