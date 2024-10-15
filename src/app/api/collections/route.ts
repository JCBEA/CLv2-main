// api/collection

import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  try {
    // Fetch all records from the 'image_collection' table
    const { data: fetchCollection, error: fetchError } = await supabase
      .from('image_collections')
      .select('*'); // Selects all columns

    if (fetchError) {
      console.error('Error fetching image collection:', fetchError);
      return NextResponse.json({ message: 'Failed to fetch image collection', error: fetchError.message }, { status: 500 });
    }

    // Fetch all records from the 'child_collection' table
    const { data: fetchChildCollection, error: fetchChildError } = await supabase
      .from('child_collection')
      .select('*'); // Selects all columns

    if (fetchChildError) {
      console.error('Error fetching child collection:', fetchChildError);
      return NextResponse.json({ message: 'Failed to fetch child collection', error: fetchChildError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      imageCollection: fetchCollection, 
      childCollection: fetchChildCollection 
    }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ message: 'Signature verification failed or error processing the request' }, { status: 500 });
  }
}
