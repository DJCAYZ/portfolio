import { courses, files, submissions } from "@/lib/data";
import { cn, getColor, getTermColor, toProperCase } from "@/lib/utils";
import dayjs from "@/lib/dayjs";
import { notFound } from "next/navigation";
import TextContent from "./text-content";
import path from "path";
import { promises as fs } from 'fs';
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import DownloadButton from "@/components/download-button";

async function getMdContent(filePath: string) {
  try {
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    const fullPath = path.join(process.cwd(), 'content', cleanPath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Failed to read file: ${filePath}`, error);
  }
}

export default async function SubmissionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>,
}) {
  const { id } = await params;
  const submission = submissions.find(sub => sub.id === +id);

  if (!submission) return notFound();

  const entryDetails = await Promise.all(
    submission.entries.map(async entry => {
      if (entry.type === 'text') {
        const content = await getMdContent(entry.contents);
        return { ...entry, contents: content};
      } else if (entry.type === 'file') {
        const file = files.find(fileEntry => fileEntry.id === entry.fileID);
        return { ...entry, file };
      }

      return entry;
    })
  )

  const reflectionContents = submission.reflection && await getMdContent(submission.reflection);

  
  const course = courses[submission.course];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="w-8 h-8" />          
          <h1 className="text-2xl font-bold">{submission.name}</h1>
        </div>
        <div className="flex gap-2">
          <span className={cn(
            "px-3 py-1 rounded-lg text-sm",
            getColor(submission.course)
          )}>
            {course.shortCode}
          </span>
          <span className={cn(
            "px-3 py-1 rounded-lg text-sm",
            getTermColor(submission.term)
          )}>
            {toProperCase(submission.term)}
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex gap-2 items-center">
        <span className="font-medium">Submitted:</span>
        <span className="col-span-3">
          {dayjs.tz(submission.date, 'Asia/Manila').format('MMMM DD, YYYY hh:mm:ss A')}
        </span>
      </div>

      {/* Files */}
      <h2 className="text-lg font-bold">Entries</h2>
      <div className="space-y-2">
        {entryDetails.map((entry, index) => (
          <div key={index} className="bg-white text-black rounded-lg p-4">
            <div className="space-y-2">
              <h3 className="text-gray-500 text-sm">{toProperCase(entry.type)} Entry</h3>
              <div key={index} className="border rounded-lg">
                {entry.type === 'text' ? (
                  <TextContent contents={entry.contents} />
                ) : entry.type === 'file' ? (
                  <div className="flex justify-between items-center gap-2">
                    <span className="col-span-2">{entry.file?.fileName}</span>
                    <div className="flex gap-2">
                      <Button asChild>
                        <Link href={`/portfolio/files/${entry.file?.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </Button>
                      <DownloadButton
                        link={`/content/files/${entry.file?.id}/${entry.file?.fileName}`}
                        fileName={entry.file?.fileName}
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={entry.url}
                    width={100}
                    height={100}
                    alt="TODO: figure out image loading holy shit"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Reflections */}
      {reflectionContents && (
      <div className="bg-white text-black rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Learning Reflections</h2>
        <div className="prose prose-slate max-w-none">
          <TextContent contents={reflectionContents} />
        </div>
      </div>
      )}
    </div>
  );
}