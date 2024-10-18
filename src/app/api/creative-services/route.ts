// api/creative-services

import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';

export async function GET(req: Request) {
  const headers = req.headers;
  const slug = headers.get("Slug");
  const header1 = req.headers;
  const dynamic = headers.get("Dynamic");

  try {
    // Fetch all users where creative_field is "creative_services"
    const { data: users, error: usersError } = await supabase
      .from('userDetails')
      .select('*')
      .eq('creative_field', dynamic);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json({ message: 'Failed to fetch users', error: usersError.message }, { status: 500 });
    }

    // Fetch image collections for each user
    const fetchCollectionPromises = users.map(async (user) => {
      const { detailsid } = user;

      const { data: fetchCollection, error: fetchError } = await supabase
        .from('image_collections')
        .select('*')
        .eq('id', detailsid)
      if (fetchError) {
        console.error(`Error fetching image collection for detailsid ${detailsid}:`, fetchError);
        return null; // Return null for this user if there's an error
      }

      return fetchCollection;
    });

    const imageCollections = await Promise.all(fetchCollectionPromises);

    // Fetch all records from the 'child_collection' table
    const { data: fetchChildCollection, error: fetchChildError } = await supabase
      .from('child_collection')
      .select('*')
      .eq('sluger', slug);

    if (fetchChildError) {
      console.error('Error fetching child collection:', fetchChildError);
      return NextResponse.json({ message: 'Failed to fetch child collection', error: fetchChildError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      users, 
      imageCollections, 
      childCollection: fetchChildCollection 
    }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ message: 'Signature verification failed or error processing the request' }, { status: 500 });
  }
}
