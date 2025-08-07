"use client";

import { File } from "@/lib/data.js";
import dynamic from "next/dynamic";

const PreviewDocument = dynamic(() => import('./preview-document'), {
  ssr: false,
});

export default function Document({ file }: { file: File }) {
  return <PreviewDocument file={file} />
}