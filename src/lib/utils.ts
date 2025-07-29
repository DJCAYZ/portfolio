import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CourseCode, Term } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toProperCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getColor(course: CourseCode): string {
  switch (course) {
    case 'itcc307':
      return 'bg-indigo-600 text-white';
    case 'itcc401':
      return 'bg-emerald-600 text-white';
    case 'itcc403':
      return 'bg-amber-600 text-white';
    case 'itcc508':
      return 'bg-rose-600 text-white';
    default:
      return 'bg-slate-600 text-white';
  }
}

export function getTermColor(term: Term): string {
  switch(term) {
    case 'prelims':
      return 'bg-blue-600 text-white';
    case 'midterms':
      return 'bg-purple-600 text-white';
    case 'finals':
      return 'bg-red-600 text-white';
    default:
      return 'bg-slate-600 text-white';
  }
}