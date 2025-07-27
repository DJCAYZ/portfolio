import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Projects',
}

export default function ProjectsLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}