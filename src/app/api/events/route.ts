import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function PUT(req: Request) {
  const userId = req.headers.get('User-ID'); // Extract user ID from custom header

  if (!userId) {
    return NextResponse.json({ message: 'User ID or Authorization header is missing' }, { status: 401 });
  }

  try {
    const { event_title, event_location, start_time, end_time, selected_date, description } = await req.json();

    // Insert into Supabase
    const { error } = await supabase
      .from('creative_events')
      .insert({
        created_at: new Date(),
        event_title,
        event_location,
        start_time,
        end_time,
        selected_date,
        description,
        user_id: userId, // Use the extracted user ID
      });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Event inserted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Failed to verify token' }, { status: 401 });
  }
}


export async function GET(req: Request) {
  
}