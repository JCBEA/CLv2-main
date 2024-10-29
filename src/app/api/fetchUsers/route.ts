import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  try {
    // Fetch all active events for the user from Supabase
    const { data, error } = await supabase
      .from('userDetails')
      .select('*')
      .eq('status', true);

    if (error) {
      console.error('Supabase error:', error.message);
      return NextResponse.json(
        { message: `Error fetching events: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data?.length) {
      return NextResponse.json(
        { message: 'No active  user found.' },
        { status: 204 } // No Content
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Unexpected error fetching users:', error);
    return NextResponse.json(
      { message: 'Failed to fetch users due to a server error.' },
      { status: 500 }
    );
  }
}
