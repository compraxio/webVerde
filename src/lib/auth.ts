'use server'
import { cookies } from 'next/headers';

export async function getUser() {
  const session = (await cookies()).get('admin');

  if (!session) return false;

  return true
}
