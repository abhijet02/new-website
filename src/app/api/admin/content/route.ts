import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { readSiteContent, validateSiteContent, writeSiteContent } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  return NextResponse.json(await readSiteContent(), {
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const content = await request.json().catch(() => null);
  if (!validateSiteContent(content)) {
    return NextResponse.json({ error: 'The content structure is incomplete or invalid.' }, { status: 400 });
  }
  try {
    await writeSiteContent(content);
    return NextResponse.json({ saved: true, savedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: 'Unable to save content.' }, { status: 500 });
  }
}
