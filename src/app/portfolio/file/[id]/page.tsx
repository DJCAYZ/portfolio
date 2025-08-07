import { SidebarTrigger } from "@/components/ui/sidebar";
import { files } from "@/lib/data";
import { notFound } from "next/navigation";
import Document from "./document";
import DownloadButton from "@/components/download-button";

export default async function FilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const file = files.find(entry => entry.id === +id);

  if (!file) notFound();

  return (
    <>
      <div className="sticky top-0 left-0 w-full flex justify-between p-2 bg-gray-500/50 z-20">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="w-8 h-8" />
          <h1>{file.fileName}</h1>
        </div>

        <DownloadButton
          link={`/content/file/${file.id}/${file.fileName}`}
          fileName={file.fileName}
        />
        
      </div>

      <Document file={file} />
    </>
  );
}