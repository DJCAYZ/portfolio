import { Button } from "@/components/ui/button";
import { CourseCode, courses, submissions, Term } from "@/lib/data";
import { toProperCase } from "@/lib/utils";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function TermPage({ params } : {
  params: Promise<{ term: Term, code: CourseCode }>
}) {
  const { term, code } = await params;
  const course = courses[code];

  if (!course || !course.terms?.find(courseTerm => courseTerm === term)) return notFound();

  const submissionList = submissions.filter(submission => submission.course === code && submission.term === term);
  
  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="w-8 h-8" />
        <h1 className="font-bold text-3xl">{course.shortCode} {toProperCase(term)} Submissions</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {submissionList.map((submission, index) => (
          <Button key={index} className="bg-white h-16 p-4 text-black rounded-lg grid grid-rows-2 grid-cols-2 gap-2 items-center" asChild>
            <Link href={`/portfolio/submission/${submission.id}`}>
              <p className="text-gray-500 text-xs">ID:{submission.id}</p>
              <p className="row-span-2 text-gray-500 text-xs text-right">{dayjs.tz(submission.date, 'Asia/Manila').format('MM/DD - hh:mm A')}</p>
              <p className="font-bold">{submission.name}</p>
            </Link>
          </Button>
        ))}
        {submissionList.length < 1 && (
          <h3 className="text-xl text-center">No submissions found.</h3>
        )}
      </div>
    </div>
  )
}