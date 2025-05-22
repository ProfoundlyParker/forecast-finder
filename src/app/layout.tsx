'use client'

import { Figtree } from "next/font/google";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const figtree = Figtree({
  style: "normal",
  weight: "400",
  subsets: ["latin"]
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // creates new instance of queryclient, used for managing data fetching and caching
  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={figtree.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
