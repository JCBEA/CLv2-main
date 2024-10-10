import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  const userId = req.headers.get('Authorization'); // Directly get the user ID from the Authorization header

  if (!userId) {
    return NextResponse.json({ message: 'User ID is missing' }, { status: 401 });
  }

  try {
    // Fetch messages where 'for' equals userId or id equals userId, including the id in the select
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('id, first_name, message, created_at') // Include 'id' here
      .or(`for.eq.${userId},id.eq.${userId}`);

    if (messagesError) {
      console.error('Supabase fetch error for messages:', messagesError);
      return NextResponse.json({ message: 'Failed to fetch messages', error: messagesError.message }, { status: 500 });
    }

    // Extract ids from messages for further fetching userDetails
    const messageIds = messages?.map(msg => msg.id) || []; // Now you can access msg.id

    // Fetch user details where detailsid matches userId
    const { data: userDetailsByUserId, error: userDetailsByUserIdError } = await supabase
      .from('userDetails')
      .select('*')
      .eq('detailsid', userId); // Fetch user details where detailsid matches userId

    if (userDetailsByUserIdError) {
      console.error('Supabase fetch error for userDetails by userId:', userDetailsByUserIdError);
      return NextResponse.json({ message: 'Failed to fetch user details by userId', error: userDetailsByUserIdError.message }, { status: 500 });
    }

    // Fetch user details where detailsid matches ids from messages
    const { data: userDetailsByMessageIds, error: userDetailsByMessageIdsError } = await supabase
      .from('userDetails')
      .select('*')
      .in('detailsid', messageIds); // Fetch user details where detailsid matches the ids from messages

    if (userDetailsByMessageIdsError) {
      console.error('Supabase fetch error for userDetails by messageIds:', userDetailsByMessageIdsError);
      return NextResponse.json({ message: 'Failed to fetch user details by message IDs', error: userDetailsByMessageIdsError.message }, { status: 500 });
    }

    // Combine user details
    const combinedUserDetails = [
      ...(userDetailsByUserId || []),
      ...(userDetailsByMessageIds || []),
    ];

    // Return the fetched messages and combined user details
    return NextResponse.json(
      { messages: messages || [], userDetails: combinedUserDetails },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
  }
}
