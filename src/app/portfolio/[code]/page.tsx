import { Button } from "@/components/ui/button";
import { CourseCode, courses, submissions } from "@/lib/data";
import { cn, getColor, getTermColor, toProperCase } from "@/lib/utils";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function CoursePage({
  params
}: { params: Promise<{ code: CourseCode }> }) {
  const { code } = await params;

  const course = courses[code];
  const pinned_submission = submissions.find(sub => sub.id === course.pinned_submission);
  const recent_submissions = submissions.filter(submission => submission.course === code).sort((a, b) => dayjs(a.date).diff(dayjs(b.date))).slice(0, 5);

  if (!course) return notFound();

  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <div className="p-2 flex justify-between gap-2 items-center">
        <SidebarTrigger className="w-8 h-8" />
        <h1 className="text-left font-bold text-3xl">{course.title}</h1>
        <span className={
          cn(
            "text-md rounded-lg py-1 px-2",
            getColor(code)
          )
        }>{`${course.shortCode} - ${course.section}`}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-white items-center text-black p-4 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-2">
          <span className="sm:text-right">Course Code:</span>
          <span className="sm:col-span-3 sm:text-center font-bold">{course.shortCode}</span>
          <span className="sm:text-right">Professor:</span>
          <span className="sm:col-span-3 sm:text-center font-bold">{course.professor}</span>
          <span className="sm:text-right">Section:</span>
          <span className="sm:col-span-3 sm:text-center font-bold">{course.section}</span>
        </div>
        
        <div className="grid grid-cols-[1fr_65%_1fr] bg-white p-4 rounded-lg text-black items-center text-center">
          <span className="col-span-3 font-bold">Schedule</span>
          {course.schedule.map((schedule, index) => (
            <Fragment
              key={index}
            >
              <span className="text-left">{schedule.day}</span>
              <span>{schedule.startTime} - {schedule.endTime}</span>
              <span className="text-right">{schedule.room}</span>
            </Fragment>
          ))}
        </div>

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

      <div className="grid grid-cols-4 gap-2 p-2 rounded-lg text-center items-center">
        <span className="">Terms</span>
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

      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-xl">Recent Submissions</h3>
        </div>
        {recent_submissions.map((submission, index) => (
          <Button key={index} className="bg-white h-16 p-4 text-black rounded-lg grid grid-rows-2 grid-cols-2 gap-2 items-center" asChild>
            <Link href={`/portfolio/submission/${submission.id}`}>
              <p className="text-gray-500 text-xs">ID:{submission.id}</p>
              <p className="row-span-2 text-gray-500 text-xs text-right">{dayjs.tz(submission.date, 'Asia/Manila').format('MM/DD - hh:mm A')}</p>
              <p className="font-bold">{submission.name}</p>
            </Link>
          </Button>
        ))}
      </div>

    </div>
  )
}