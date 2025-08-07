import Image from "next/image";
import ProfilePicture from './profile.jpg';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <main className="row-start-2 p-2">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="rounded-full w-40"
            src={ProfilePicture}
            alt="NextJS Logo"
            priority
          />
          <h1 className="text-3xl text-center font-bold">Charles Aaron S.</h1>
          <p className="text-xs text-center font-light">Student | Aspiring Software Developer | Amateur Video Editor</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4">
          <Button asChild>
            <Link href="/certifications">Certifications</Link>
          </Button>
          <Button asChild>
            <Link href="/portfolio">University Portfolio</Link>
          </Button>
          <Button asChild>
            <Link href="/projects">Projects</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
