// api/chat/search_user

import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  try {
    // Extract userId from query parameters
    const userId = req.headers.get('Authorization');
    if (!userId) {
      return NextResponse.json({ message: 'userId is required' }, { status: 400 });
    }

    // Fetch all records from the 'userDetails' table where id is not equal to userId
    const { data: userDetails, error: fetchError } = await supabase
      .from('userDetails')
      .select('*')
      .neq('detailsid', userId); // Add condition to exclude userId

    if (fetchError) {
      console.error('Error fetching user details:', fetchError);
      return NextResponse.json({ message: 'Failed to fetch user details', error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      userDetails // Return the filtered user details
    }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ message: 'Error processing the request' }, { status: 500 });
  }
}
