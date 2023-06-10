import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import type { PropsWithChildren } from "react";
import StudentsLayout from "@/app/components/students/StudentsLayout";
import Providers from "@/utils/providers";

export const metadata = {
  title: "Student Management System",
  description:
    "Frontend for Student Management System built with Next.js and Spring Boot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="retro">
      <body className={inter.className}>
        <Providers>
          <StudentsLayout>{children}</StudentsLayout>
        </Providers>
      </body>
    </html>
  );
}
