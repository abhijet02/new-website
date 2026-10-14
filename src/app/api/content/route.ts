import { NextResponse } from 'next/server';
import { readSiteContent } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await readSiteContent(), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Unable to load site content.' }, { status: 500 });
  }
}
