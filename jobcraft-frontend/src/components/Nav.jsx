"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-4xl items-center py-3">
        <Link href="/" className="text-lg font-bold">JobCraft</Link>
        {/* <Link href="/upload" className="text-sm hover:underline">Upload</Link> */}
      </nav>
    </header>
  );
}
