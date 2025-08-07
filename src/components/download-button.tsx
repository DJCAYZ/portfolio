import Link from "next/link";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export default function DownloadButton({
  link,
  fileName,
}: {
  link: string,
  fileName?: string,
}) {
  return (
    <Button className="bg-blue-500 text-white hover:bg-blue-500/90" asChild>
      <Link
        href={link}
        download={fileName}
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Link>
    </Button>
  )
}