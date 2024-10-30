import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
    try {
      // Fetch data from the "admin_events" table
      const { data, error } = await supabase
        .from('admin_events')
        .select('*'); // Select all fields; you can specify fields as needed
  
      // Handle any potential errors
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      // Respond with the fetched data
      return NextResponse.json(data || [], { status: 200 });
    } catch (err) {
      console.error('Error fetching events:', err); // Log the error for debugging
      return NextResponse.json({ error: 'An error occurred while fetching events.' }, { status: 500 });
    }
  }


  export async function PUT(req: Request) {
    try {
      // Parse the JSON body from the request
      const { id, status } = await req.json();
  
      // Update the "admin_events" table
      const { data, error } = await supabase
        .from('admin_events')
        .update({ status }) // Update status
        .eq('id', id);      // Where id matches
  
      // Handle any potential errors
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      // Respond with the updated data
      return NextResponse.json(data || [], { status: 200 });
    } catch (err) {
      console.error('Error updating events:', err); // Log the error for debugging
      return NextResponse.json({ error: 'An error occurred while updating events.' }, { status: 500 });
    }
  }