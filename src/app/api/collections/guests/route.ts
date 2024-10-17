import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  try {
    // Fetch both collections in parallel
    const [fetchCollectionResult, fetchChildCollectionResult] = await Promise.all([
      supabase.from('image_collections').select('*'),
      supabase.from('child_collection').select('*')
    ]);

    const { data: fetchCollection, error: fetchError } = fetchCollectionResult;
    const { data: fetchChildCollection, error: fetchChildError } = fetchChildCollectionResult;

    if (fetchError) {
      console.error('Error fetching image collection:', fetchError);
      return NextResponse.json({ message: 'Failed to fetch image collection', error: fetchError.message }, { status: 500 });
    }

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
