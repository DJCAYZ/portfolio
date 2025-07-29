import { courses, submissions } from "@/lib/data";
import { cn, getColor, getTermColor, toProperCase } from "@/lib/utils";
import dayjs from "@/lib/dayjs";
import { notFound } from "next/navigation";
import TextContent from "./text-content";
import path from "path";
import { promises as fs } from 'fs';

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

  const fileContents = await Promise.all(
    submission.files.map(async file => {
      if (file.type === 'text') {
        const content = await getMdContent(file.contents);
        return { ...file, contents: content};
      }

      return file;
    })
  )

  const reflectionContents = submission.reflection && await getMdContent(submission.reflection);

  
  const course = courses[submission.course];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{submission.name}</h1>
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
      <div className="bg-white text-black rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Files</h2>
        <div className="space-y-4">
          {fileContents.map((file, index) => (
            <div key={index} className="border rounded-lg p-4">
              {file.type === 'text' ? (
                <TextContent contents={file.contents} />
              ) : (
                <a 
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  View {file.type.toUpperCase()} File
                </a>
              )}
            </div>
          ))}
        </div>
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