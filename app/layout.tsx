import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={clsx(
            "min-h-screen bg-[rgba(0,0,0)] text-white font-sans antialiased",
            fontSans.variable,
          )}
        >
          <Navbar />
          <main className="flex-grow pt-4">{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
