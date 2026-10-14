import { NextRequest, NextResponse } from 'next/server';
import { passwordConfigured, setSessionCookie, verifyPassword } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!passwordConfigured()) {
    return NextResponse.json({ error: 'Admin credentials are not configured.' }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  if (typeof body.password !== 'string' || !verifyPassword(body.password)) {
    await new Promise(resolve => setTimeout(resolve, 450));
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }
  const response = NextResponse.json({ authenticated: true });
  setSessionCookie(response);
  return response;
}
