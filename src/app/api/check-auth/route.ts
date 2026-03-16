import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const session = (await cookies()).get('admin');

  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true });
}
