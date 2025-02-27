import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const field = url.searchParams.get("field");

        if (!field) {
            return NextResponse.json({ error: 'Field parameter is required in query string' }, { status: 400 });
        }

        // Query usersLikes table
        const { data: usersLikes, error: usersLikesError } = await supabase
        .from('usersLikes')
        .select('*');

        if (usersLikesError) {
            console.error('usersLikesError:', usersLikesError);  // Log the error
            return NextResponse.json({ error: usersLikesError.message }, { status: 500 });
        }

        if (usersLikes.length === 0) {
            return NextResponse.json({ message: 'No matching records found in usersLikes' }, { status: 404 });
        }

        const likesCount = Array.isArray(usersLikes) ? usersLikes.map((like, index) => {
            // Ensure `guest` is a number (default to 0 if undefined or null)
            const guestCount = like.guest ? Number(like.guest) : 0;       
            // Ensure `users` is an array (default to empty array if not an array)
            const usersCount = Array.isArray(like.users) ? like.users.length : 0; 
            const addedCount = guestCount + usersCount;
            
            return {
                ...like,
                count: addedCount,  // Store the calculated total count
            };
        }) : [];


        const topLikes = likesCount.sort((a, b) => b.count - a.count).slice(0, 10);

        // Fetch userDetails for top likes
        const topGalleryLikedIds = topLikes.map((like) => like.galleryLiked);
        const { data: userDetails, error: userDetailsError } = await supabase
        .from('userDetails')
        .select('*')
        .in('detailsid', topGalleryLikedIds)
        .eq('creative_field', field);

        if (userDetailsError) {
            console.error('userDetailsError:', userDetailsError);  // Log the error
            return NextResponse.json({ error: userDetailsError.message }, { status: 500 });
        }

        if (userDetails.length === 0) {
            return NextResponse.json({ message: 'No matching records found in userDetails' }, { status: 404 });
        }

        // Filter userLikes based on userDetails.detailsid
        const filteredLikes = likesCount.filter(like => userDetails.some(detail => detail.detailsid === like.galleryLiked));

        // Combine filteredLikes with userDetails
        const combinedData = userDetails.map((detail) => {
            const likes = filteredLikes.filter((like) => like.galleryLiked === detail.detailsid);
            const newCount = likes.map((like) => like.count);
            return {
                ...detail,
                likes, 
                newCount // Include the likes associated with each userDetail
            };
        });
        
        return NextResponse.json(combinedData);
    } catch (error) {
        console.error('Unexpected error:', error);  // Log unexpected errors
        return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
}
