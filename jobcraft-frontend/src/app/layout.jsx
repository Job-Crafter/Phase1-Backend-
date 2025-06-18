import "@/app/globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "JobCraft",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Nav />
        <main className="mx-auto max-w-4xl p-4">{children}</main>
      </body>
    </html>
  );
}
