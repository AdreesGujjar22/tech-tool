/**
 * Migration Guide: React Router DOM → Next.js App Router
 * 
 * Key Changes:
 * 1. File-based routing replaces <Routes> configuration
 * 2. Link component from 'next/link' replaces react-router-dom Link
 * 3. useRouter() from 'next/router' replaces useNavigate()
 * 4. Dynamic routes use [param] folder syntax
 * 5. Layouts are component-based via layout.tsx files
 */

// OLD: React Router DOM approach
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// export const router = createBrowserRouter([
//   { path: '/', element: <HomePage /> },
//   { path: '/about', element: <AboutPage /> },
//   { path: '/tools/:id', element: <ToolPage /> },
// ])

// NEW: Next.js file structure
// src/app/
// ├── layout.tsx (root layout)
// ├── page.tsx (/ route)
// ├── about/
// │   └── page.tsx (/about route)
// └── tools/
//     ├── page.tsx (/tools route)
//     └── [id]/
//         └── page.tsx (/tools/:id route)

// Component imports remain the same
// Just update navigation references from <Link> to next/link
