import { Button } from "@/components/ui/button";
import { CourseCode, courses, submissions } from "@/lib/data";
import { cn, getColor, getTermColor, toProperCase } from "@/lib/utils";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export default async function CoursePage({
  params
}: { params: Promise<{ code: CourseCode }> }) {
  const { code } = await params;

  const course = courses[code];
  const pinned_submission = submissions.find(sub => sub.id === course.pinned_submission);
  const recent_submissions = submissions.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))).slice(0, 5);

  if (!course) return notFound();

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 flex justify-between gap-2 items-center">
        <h1 className="text-left font-bold text-3xl">{course.title}</h1>
        <span className={
          cn(
            "text-md rounded-lg py-1 px-2",
            getColor(code)
          )
        }>{`${course.shortCode} - ${course.section}`}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white items-center text-black p-4 rounded-lg grid grid-cols-4 gap-2">
          <span className="text-right">Course Code:</span>
          <span className="col-span-3 text-center font-bold">{course.shortCode}</span>
          <span className="text-right">Professor:</span>
          <span className="col-span-3 text-center font-bold">{course.professor}</span>
          <span className="text-right">Section:</span>
          <span className="col-span-3 text-center font-bold">{course.section}</span>
        </div>
        
        <div className="grid grid-cols-3 bg-white p-4 rounded-lg text-black items-center text-center">
          <span className="col-span-3 font-bold">Schedule</span>
          {course.schedule.map((schedule, index) => (
            <Fragment
              key={index}
            >
              <span>{schedule.day}</span>
              <span>{schedule.startTime} - {schedule.endTime}</span>
              <span>{schedule.room}</span>
            </Fragment>
          ))}
        </div>

      </div>

      <div className="grid grid-cols-4 gap-2 bg-white text-black p-2 rounded-lg text-center items-center">
        <span>Terms</span>
        {course.terms?.map((term, index) => (
          <Link
            href={`/portfolio/${code}/${term}`} 
            key={index} 
            className={cn(
              'rounded-lg w-full py-1 text-center',
              'shadow-sm transition-all duration-200',
              'hover:shadow-md hover:brightness-110',
              getTermColor(term)
            )}
          >
            {toProperCase(term)}
          </Link>
        ))}
      </div>
      
      {pinned_submission && (
        <div className="bg-white text-black rounded-lg p-4">  
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Pinned Submission</h2>
            <Link 
              href={`/portfolio/submission/${pinned_submission.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View Details →
            </Link>
          </div>
          
          <div className="flex justify-between">
            <h3 className="font-medium">
              {pinned_submission.name}
            </h3>
            <span>{dayjs.tz(pinned_submission.date, 'Asia/Manila').format('MMM DD, YYYY hh:mm:ss A')}</span>
          </div>
        </div>
      )}


      <div className="flex flex-col gap-2">
        <div className="bg-white text-black rounded-lg">
          <h1 className="text-center p-2">Recent Submissions</h1>
        </div>
        {recent_submissions.map((submission, index) => (
          <Button key={index} className="bg-white h-16 text-black rounded-lg grid grid-cols-3 gap-2 items-center" asChild>
            <Link href={`/portfolio/submission/${submission.id}`}>
              <p>ID:{submission.id}</p>
              <p className="text-center">{submission.name}</p>
              <p className="text-right">{dayjs.tz(submission.date, 'Asia/Manila').format('MMM DD, YYYY hh:mm:ss A')}</p>
            </Link>
          </Button>
        ))}
      </div>

    </div>
  )
}