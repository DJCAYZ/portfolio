import Link from "next/link";
import { courses } from "@/lib/data";
import { cn, getColor } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function PortfolioPage() {
  const items = (Object.keys(courses) as Array<keyof typeof courses>).map(key => ({...courses[key], key}));
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="w-8 h-8" />
        <h1 className="text-3xl mb-2">Courses</h1>
      </div>
      {items.map((item, index) => (
        <Link
          href={`/portfolio/${item.key}`}
          key={index}
          className={cn(
            'rounded-lg w-full p-4 grid grid-cols-3 gap-2 items-center',
            'shadow-sm transition-all duration-200',
            'hover:shadow-md hover:brightness-110',
            'active:scale-[0.98]',
            getColor(item.key))}
        >
          <span className="font-medium text-sm">{item.shortCode}</span>
          <span className="text-center font-medium">{item.title}</span>
        </Link>
      ))}
      
    </div>
  );
}