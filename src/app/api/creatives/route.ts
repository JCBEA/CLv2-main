import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function PUT(req: Request) {
    console.log("PUT request received");

    const authHeader = req.headers.get('');
    if (!authHeader) {
        console.log("No Authorization header found");
        return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
        const userId = authHeader;
        console.log("UserId from Authorization:", userId);

        const body = await req.json();
        console.log("Request body:", body);

        const { detailsid, userDetails } = body;

        if (!userId) {
            console.log("Authorization mismatch");
            return NextResponse.json({ message: 'You are not authorized to update these details.' }, { status: 403 });
        }

        // Merge the userDetails object without profile picture URL
        const updatedUserDetails = { ...userDetails }; // No need to handle profile_pic
        console.log("Updated user details:", updatedUserDetails);

        // Update user details in Supabase
        const { data: updatedData, error: userDetailsError } = await supabase
            .from('userDetails')
            .update(updatedUserDetails)
            .eq('detailsid', userId)
            .select();

        if (userDetailsError) {
            console.error('Supabase userDetails update error:', userDetailsError);
            return NextResponse.json({ message: 'Failed to update user details', error: userDetailsError.message }, { status: 500 });
        }

        console.log("User details updated successfully:", updatedData);

        // Update related collections if first_name exists
        if (userDetails.first_name) {
            console.log("Updating related collections");

            const { error: childCollectionError } = await supabase
                .from('child_collection')
                .update({ artist: userDetails.first_name })
                .eq('childid', userId);

            if (childCollectionError) {
                console.error('Supabase child_collection update error:', childCollectionError);
            }

            const { error: imageCollectionError } = await supabase
                .from('image_collections')
                .update({ artist: userDetails.first_name })
                .eq('id', userId);

            if (imageCollectionError) {
                console.error('Supabase image_collection update error:', imageCollectionError);
            }
        }

        return NextResponse.json({ message: 'User details updated successfully', updatedData }, { status: 200 });

    } catch (error: any) {
        console.error('Error in PUT method:', error);
        return NextResponse.json({ message: 'Error processing the request', error: error.message }, { status: 500 });
    }
}
