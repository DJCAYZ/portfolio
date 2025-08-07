import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ exists: false });
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', 'content', 'file', id, 'preview.pdf');
    await fs.access(fullPath);
    return NextResponse.json({ exists: true });
  } catch {
    return NextResponse.json({ exists: false });
  }
}