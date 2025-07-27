import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Portfolio',
}

export default function PortfolioLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}