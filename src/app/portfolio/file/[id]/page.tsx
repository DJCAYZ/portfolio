import { SidebarTrigger } from "@/components/ui/sidebar";
import { files } from "@/lib/data";
import { notFound } from "next/navigation";
import { Document } from "react-pdf";
import PreviewDocument from "./preview-document";

export default async function FilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const file = files.find(entry => entry.id === +id);

  if (!file) notFound();

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex gap-2 items-center">
        <SidebarTrigger className="w-8 h-8" />
        <h1>{file.fileName}</h1>
      </div>

      <PreviewDocument file={file} />
    </div>
  );
}