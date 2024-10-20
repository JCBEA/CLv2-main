"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the landing page when the root page is opened
    router.replace('/landing-page');
  }, [router]);

  return (
    <main className="w-full h-[100dvh] bg-white flex items-center justify-center">
      {/* Custom Spinner */}
      <div role="status" className="flex flex-col items-center">
        <div className="spinner-border w-12 h-12 border-4 border-t-4 border-primary-2 rounded-full animate-spin"></div>
        <span className="mt-4 text-primary-2">Redirecting...</span>
      </div>

      <style jsx>{`
        .spinner-border {
          border-color: #e5e7eb;
          border-top-color: #3b82f6;
        }
      `}</style>
    </main>
  );
}
