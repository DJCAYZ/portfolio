import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Certifications',
}

export default function CertificationsLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}