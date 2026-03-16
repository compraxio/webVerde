'use client'

export async function getUser(): Promise<boolean> {
  try {
    const response = await fetch('/api/check-auth', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data.authenticated === true;
  } catch {
    return false;
  }
}
