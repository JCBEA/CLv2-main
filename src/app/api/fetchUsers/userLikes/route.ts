import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function POST(req: Request) {
  try {
    const { userId, detailsid } = await req.json();
    console.log('Incoming request:', { userId, detailsid }); // Log for debugging

    if (userId) {
      // Check if any existing likes are present for the given galleryLiked
      const { data: existingLikes, error: fetchError } = await supabase
        .from('usersLikes')
        .select('users')
        .eq('galleryLiked', detailsid);

      if (fetchError) {
        console.error('Error fetching existing likes:', fetchError.message);
        return NextResponse.json(
          { message: `Error fetching existing likes: ${fetchError.message}` },
          { status: 500 }
        );
      }

      console.log('Fetched existing likes:', existingLikes); // Log for debugging

      if (existingLikes && existingLikes.length > 0) {
        const users: number[] = existingLikes[0].users || [];

        // Check if the user already liked this gallery
        if (users.includes(userId)) {
          // Remove userId from users array and update the record
          const updatedUsers = users.filter(user => user !== userId); // Filter out the userId
        
          const { error: updateError } = await supabase
            .from('usersLikes')
            .update({ users: updatedUsers }) // Update the users array without the userId
            .eq('galleryLiked', detailsid);
        
          if (updateError) {
            console.error('Error updating user likes:', updateError.message);
            return NextResponse.json(
              { message: `Error updating user likes: ${updateError.message}` },
              { status: 500 }
            );
          }
        
          return NextResponse.json(
            { message: 'User removed their like from this gallery.' },
            { status: 200 } // OK
          );
        } else {
          // Add userId to users array and update the record
          const { error: updateError } = await supabase
            .from('usersLikes')
            .update({ users: [...users, userId] })
            .eq('galleryLiked', detailsid);

          if (updateError) {
            console.error('Error updating user likes:', updateError.message);
            return NextResponse.json(
              { message: `Error updating user likes: ${updateError.message}` },
              { status: 500 }
            );
          }
        }
      } else {
        // No existing record for galleryLiked, create a new one with the userId
        const { data, error } = await supabase
          .from('usersLikes')
          .insert([{ users: [userId], galleryLiked: detailsid }]);

        if (error) {
          console.error('Supabase error:', error.message);
          return NextResponse.json(
            { message: `Error inserting userId: ${error.message}` },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { message: 'User liked successfully!' },
        { status: 201 } // Created
      );

    } else {
      // If no userId, increment the guest count in the userLikes table
      const { data: guestData, error: guestError } = await supabase
        .from('usersLikes')
        .select('guest')
        .eq('galleryLiked', detailsid);

      if (guestError) {
        console.error('Error fetching guest record:', guestError.message);
        return NextResponse.json(
          { message: `Error fetching guest record: ${guestError.message}` },
          { status: 500 }
        );
      }

      if (guestData && guestData.length > 0) {
        const currentCount = Number(guestData[0].guest) || 0; // Ensure this is a number

        const { error: updateError } = await supabase
          .from('usersLikes')
          .update({ guest: currentCount + 1 }) // Increment properly
          .eq('galleryLiked', detailsid);
        
        if (updateError) {
          console.error('Error updating guest count:', updateError.message);
          return NextResponse.json(
            { message: `Error updating guest count: ${updateError.message}` },
            { status: 500 }
          );
        }
        
      } else {
        // Insert a new guest record with count set to 1 if no record exists
        const { data, error } = await supabase
          .from('usersLikes')
          .insert([{ guest: 1, galleryLiked: detailsid }]);

        if (error) {
          console.error('Error inserting guest record:', error.message);
          return NextResponse.json(
            { message: `Error inserting guest record: ${error.message}` },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { message: 'Guest count incremented successfully!' },
        { status: 201 } // Created
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Failed to process request due to a server error.' },
      { status: 500 }
    );
  }
}

// GET method for fetching user likes
export async function GET(req: Request) {
  try {
    const userId = req.headers.get('X-User-Id'); // Get userId from header
    const detailsId = req.headers.get('X-Details-Id'); // Get detailsId from header

    // Fetch all records where the specified userId exists in the users array
    const { data, error } = await supabase
      .from('usersLikes')
      .select('*')
      .contains('users', [Number(userId)])
      .eq("galleryLiked", detailsId ); // Ensure userId is a number if the users array holds numbers

    if (error) {
      console.error('Error fetching user likes:', error.message);
      return NextResponse.json(
        { message: `Error fetching user likes: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'User likes fetched successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Failed to process request due to a server error.' },
      { status: 500 }
    );
  }
}