import { Button } from "@/components/ui/button";
import { CourseCode, courses, submissions, Term } from "@/lib/data";
import { toProperCase } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TermPage({ params } : {
  params: Promise<{ term: Term, code: CourseCode }>
}) {
  const { term, code } = await params;
  const course = courses[code];

  if (!course || !course.terms?.find(courseTerm => courseTerm === term)) return notFound();

  const submissionList = submissions.filter(submission => submission.course === code && submission.term === term);
  
  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <h1 className="font-bold text-3xl">{course.shortCode} {toProperCase(term)} Submissions</h1>
      <div className="flex flex-col gap-2 w-full">
        {submissionList.map((submission, index) => (
          <Button key={index} className="bg-white p-2 text-black rounded-lg grid grid-cols-3 gap-2 items-center" asChild>
            <Link href={`/portfolio/submission/${submission.id}`}>
              <p>ID:{submission.id}</p>
              <p className="text-center">{submission.name}</p>
              <p className="text-right">{dayjs.tz(submission.date, 'Asia/Manila').format('MMM DD, YYYY hh:mm:ss A')}</p>
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