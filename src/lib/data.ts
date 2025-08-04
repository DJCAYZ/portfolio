export const submissions: Submission[] = [
  {
    id: 1,
    name: 'My Expectations of ITCC508',
    course: 'itcc508',
    term: 'prelims',
    date: '2025-07-29T22:42:00.000Z',
    files: [
      { type: 'text', contents: 'submissions/1/content.md' },
    ],
    reflection: 'submissions/1/reflection.md',
  },
]

export const courses: Record<CourseCode, CourseInfo> = {
  "itcc307": {
    shortCode: 'ITC C307',
    title: 'Foundation of Business Analytics',
    section: '401I',
    professor: 'Emerson Flores',
    schedule: [
      {day: 'Monday', startTime: '01:30PM', endTime: '04:30PM', room: 'T-43'},
      {day: 'Thursday', startTime: '01:30PM', endTime: '03:30PM', room: 'ONL'},
    ],
    terms: ['prelims'],
  },
  "itcc401": {
    shortCode: 'ITC C401',
    title: 'System Administration and Maintenance',
    section: '401I',
    professor: 'Israel Cariño',
    schedule: [
      {day: 'Tuesday', startTime: '04:30PM', endTime: '06:30PM', room: 'ONL'},
      {day: 'Friday', startTime: '04:30PM', endTime: '07:30PM', room: 'H-303'},
    ],
    terms: ['prelims'],
  },
  "itcc403": {
    shortCode: 'ITC C403',
    title: 'IT Project 2',
    section: '401I',
    professor: 'Sharmaine Justyne Maglapuz',
    schedule: [
      {day: 'Monday', startTime: '05:00PM', endTime: '06:30PM', room: 'H-304'},
      {day: 'Thursday', startTime: '05:00PM', endTime: '06:30PM', room: 'ONL'},
    ],
    terms: ['prelims'],
  },
  "itcc508": {
    shortCode: 'ITC C508',
    title: 'ITE Elective 4',
    section: '401I',
    professor: 'Rodolfo Raga',
    pinned_submission: 1,
    schedule: [
      {day: 'Tuesday', startTime: '10:30AM', endTime: '12:30PM', room: 'ONL'},
      {day: 'Friday', startTime: '10:30AM', endTime: '01:30PM', room: 'H-310'},
    ],
    terms: ['prelims'],
  },
}

export const files: File[] = [
  {
    id: 1,
    fileName: 'AWS_Lab Activity 2.docx',
    previewFile: 'AWS_Lab Activity 2.pdf',
  },
]

export type CourseCode = 'itcc307' | 'itcc401' | 'itcc403' | 'itcc508';
export type Term = 'prelims' | 'midterms' | 'finals';

export interface CourseInfo {
  shortCode: string;
  title: string;
  professor: string;
  section: string;
  schedule: CourseSchedule[];
  pinned_submission?: number,
  terms?: Term[];
}

interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string | 'ONL';
}

interface Submission {
  id: number;
  name: string;
  course: CourseCode;
  term: Term;
  date: string;
  files: (TextSubmissionFile | OtherSubmissionFile)[];
  reflection?: string;
}

interface TextSubmissionFile {
  type: 'text';
  contents: string;
}

interface OtherSubmissionFile {
  type: 'docx' | 'image';
  url: string;
}

export interface File {
  id: number;
  fileName: string;
  previewFile: string;
}

