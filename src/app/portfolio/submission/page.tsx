import { Button } from "@/components/ui/button";
import { submissions } from "@/lib/data";
import dayjs from "dayjs";
import Link from "next/link";

export default function SubmissionListPage() {
  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <h1 className="font-bold text-3xl">All Submissions</h1>
      <div className="flex flex-col gap-2 w-full">
        {submissions.sort((a, b) => a.id - b.id).map((submission, index) => (
          <Button key={index} className="bg-white p-2 text-black rounded-lg grid grid-cols-3 gap-2 items-center" asChild>
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