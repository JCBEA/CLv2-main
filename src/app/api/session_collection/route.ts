import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  const userId = req.headers.get('Authorization');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is missing' }, { status: 401 });
  }

  try {
    // Fetch messages related to the user
    const { data: messages, error: messagesError } = await supabase
      .from('image_collections')
      .select('*')
      .eq('id', userId);

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
