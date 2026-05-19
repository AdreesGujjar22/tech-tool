'use client';

import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dark">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to TechTools
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Smart Online Utilities for Developers, Creators, and Everyday Users
        </p>
        <p className="text-gray-500">
          ✨ Next.js migration complete! Start building your tools here.
        </p>
      </div>
    </main>
  );
}
