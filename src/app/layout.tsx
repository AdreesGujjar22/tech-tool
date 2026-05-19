'use client';

import React, { ReactNode } from 'react';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TechTools - Smart Online Utilities</title>
        <meta
          name="description"
          content="Fast, free, and modern online tools for developers, creators, and everyday users."
        />
        <link rel="icon" type="image/png" href="/images/fav-icon.png" />
        <link rel="apple-touch-icon" href="/images/fav-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
