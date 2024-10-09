import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient'; // Adjust import as necessary
import { jwtVerify } from 'jose';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret'; // Use a strong secret

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
  const authHeader = req.headers.get('Authorization')?.split(' ')[1];
  if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const payload = authHeader;
   
      console.log("Verified token payload:", payload);

      const userId = payload; 
      const { detailsid, userDetails } = await req.json(); 

      if (userId != detailsid) {
          return NextResponse.json({ message: `userID:${userId}  userDetails: ${userDetails} You are not authorized to update these details.` }, { status: 403 });
      }

      const { error } = await supabase
          .from('userDetails')
          .update(userDetails)
          .eq('detailsid', userId);

      if (error) {
          console.error('Supabase update error:', error);
          return NextResponse.json({ message: 'Failed to update user details', error: error.message }, { status: 500 });
      }

      return NextResponse.json({ message: 'User details updated successfully' }, { status: 200 });
  } catch (error) {
      console.error('Error in PUT method:', error);
      return NextResponse.json({ message:'Signature verification failed or error processing the request' }, { status: 500 });
  }
}