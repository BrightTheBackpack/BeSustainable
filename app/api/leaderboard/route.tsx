//@ts-nocheck
import { get, set, ref } from 'firebase/database';
import { database } from '#/lib/firebase.ts';
export async function GET(request) {
    databaseRef = ref(database, 'users');
    const snapshot = await get(databaseRef);
    return new Response(JSON.stringify({ message: 'Hello, world!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  