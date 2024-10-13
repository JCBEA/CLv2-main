import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  const userId = req.headers.get('Authorization');

  if (!userId) {
    return NextResponse.json({ message: 'User ID or username is missing' }, { status: 401 });
  }

  try {
    // Fetch messages where 'for' or 'id' is equal to the userId
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('id, first_name, message, created_at, for')
      .or(`for.eq.${userId},id.eq.${userId}`);

    if (messagesError) {
      console.error('Supabase fetch error for messages:', messagesError);
      return NextResponse.json({ message: 'Failed to fetch messages', error: messagesError.message }, { status: 500 });
    }

    return NextResponse.json(
      { messages: messages || [] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
  }
}
