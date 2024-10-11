import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  const userId = req.headers.get('Authorization');
  const username = req.headers.get('Append');
  
  if (!userId && !username) {
    return NextResponse.json({ message: 'User ID is missing' }, { status: 401 });
  }

  try {
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('id, first_name, message, created_at')
      .or(`for.eq.${userId},id.eq.${userId}`);

    if (messagesError) {
      console.error('Supabase fetch error for messages:', messagesError);
      return NextResponse.json({ message: 'Failed to fetch messages', error: messagesError.message }, { status: 500 });
    }

    const messageIds = messages?.map(msg => msg.id) || [];

    const { data: userDetailsByUserId, error: userDetailsByUserIdError } = await supabase
      .from('userDetails')
      .select('*')
      .eq('detailsid', userId);

    if (userDetailsByUserIdError) {
      console.error('Supabase fetch error for userDetails by userId:', userDetailsByUserIdError);
      return NextResponse.json({ message: 'Failed to fetch user details by userId', error: userDetailsByUserIdError.message }, { status: 500 });
    }

    const { data: userDetailsByMessageIds, error: userDetailsByMessageIdsError } = await supabase
      .from('userDetails')
      .select('*')
      .in('detailsid', messageIds);

    if (userDetailsByMessageIdsError) {
      console.error('Supabase fetch error for userDetails by messageIds:', userDetailsByMessageIdsError);
      return NextResponse.json({ message: 'Failed to fetch user details by message IDs', error: userDetailsByMessageIdsError.message }, { status: 500 });
    }

    const combinedUserDetails = [
      ...(userDetailsByUserId || []),
      ...(userDetailsByMessageIds || []),
    ];

    return NextResponse.json(
      { messages: messages || [], userDetails: combinedUserDetails },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const userId = req.headers.get('Authorization');
  const username = req.headers.get('Append');

  if (!userId || !username) {
    return NextResponse.json({ message: 'User ID or Username is missing' }, { status: 400 });
  }

  try {
    const body = await req.json(); // Extract the body from the request
    const { message } = body; // Assuming the message is passed in the request body as { message: "some message" }

    if (!message) {
      return NextResponse.json({ message: 'Message is missing' }, { status: 400 });
    }

    // Insert the new message into the 'messages' table where id == userId and first_name == username
    const { data: insertData, error: insertError } = await supabase
      .from('messages')
      .insert([
        {
          id: userId, // Ensure this matches the userId from headers
          first_name: username, // Ensure this matches the username from headers
          message, // The message to be inserted from the request body
          created_at: new Date().toISOString() // Automatically generate the timestamp
        }
      ]);

    if (insertError) {
      console.error('Error inserting message:', insertError);
      return NextResponse.json({ message: 'Failed to insert message', error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message inserted successfully', data: insertData }, { status: 200 });
  } catch (error: any) {
    console.error('Error inserting message:', error);
    return NextResponse.json({ message: 'Error inserting message', error: error.message }, { status: 500 });
  }
}
