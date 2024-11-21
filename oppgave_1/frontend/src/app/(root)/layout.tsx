import Navbar from '@/components/Navbar';
import React, { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="font-work-sans">
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar/>
            </Suspense>
            {children}
        </main>
    );
}
