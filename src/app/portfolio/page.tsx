import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Portfolio() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 min-h-screen">
      <h2 className="text-2xl font-bold">Uni Portfolio</h2>
      <h3 className="text-xl">Soon.</h3>
      <Button asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  )
}