import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';
import { jwtVerify } from 'jose';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

// GET method to retrieve a list of creatives
export async function GET() {
  const creatives = [
    { id: '1', name: 'John Doe', skill: 'Graphic Design', bio: 'Experienced designer based in Legazpi' },
    { id: '2', name: 'Jane Smith', skill: 'Illustration', bio: 'Freelance illustrator specializing in children\'s books' },
    { id: '3', name: 'Sean Smith', skill: 'Illustration', bio: 'Freelance illustrator specializing in children\'s books' },
    // Add more mock creatives as needed
  ];

  return NextResponse.json(creatives);
}

// PUT method to update user details based on token
export async function PUT(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const payload = authHeader;
    console.log("Verified token payload:", payload);

    const userId = payload; // Assuming payload contains the userId
    const { detailsid, userDetails } = await req.json();

    if (userId != detailsid) {
      return NextResponse.json({ message: `You are not authorized to update these details.` }, { status: 403 });
    }

    // Update userDetails table
    const { error: userDetailsError } = await supabase
      .from('userDetails')
      .update(userDetails)
      .eq('detailsid', userId);

    if (userDetailsError) {
      console.error('Supabase userDetails update error:', userDetailsError);
      return NextResponse.json({ message: 'Failed to update user details', error: userDetailsError.message }, { status: 500 });
    }
    if (userDetails.first_name) {
      const { error: childCollectionError } = await supabase
        .from('child_collection')
        .update({ artist: userDetails.first_name })
        .eq('childid', userId); 

      if (childCollectionError) {
        console.error('Supabase child_collection update error:', childCollectionError);
        return NextResponse.json({ message: 'Failed to update related child collection', error: childCollectionError.message }, { status: 500 });
      }

      // Update artist in image_collection
      const { error: imageCollectionError } = await supabase
        .from('image_collections')
        .update({ artist: userDetails.first_name }) 
        .eq('id', userId); 

      if (imageCollectionError) {
        console.error('Supabase image_collection update error:', imageCollectionError);
        return NextResponse.json({ message: 'Failed to update related image collection', error: imageCollectionError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'User details, child collection, and image collection updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error in PUT method:', error);
    return NextResponse.json({ message: 'Signature verification failed or error processing the request' }, { status: 500 });
  }
}