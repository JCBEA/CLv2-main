import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function PUT(req: Request) {
    console.log("PUT request received");

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        console.log("No Authorization header found");
        return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
        const userId = authHeader;
        console.log("UserId from Authorization:", userId);

        const body = await req.json();
        console.log("Request body:", body);

        const { detailsid, userDetails, profilePicFile } = body;

        if (!userId) {
            console.log("Authorization mismatch");
            return NextResponse.json({ message: `You are not authorized to update these details.` }, { status: 403 });
        }

        let profilePicUrl = null;

        if (profilePicFile) {
            console.log("Profile pic file found, attempting upload");

            // Check if profilePicFile is in correct format
            if (!profilePicFile.startsWith('data:')) {
                console.error('Invalid image format:', profilePicFile);
                return NextResponse.json({ message: 'Invalid image format', status: 400 });
            }

            // Determine file extension based on MIME type
            const mimeType = profilePicFile.split(';')[0].split(':')[1];
            const fileExtension = mimeType === 'image/png' ? 'png' : 'jpg'; // Adjust this logic for other formats if needed
            const fileName = `${userId}-${Date.now()}.${fileExtension}`;
            console.log("Generated file name:", fileName);

            // Upload to Supabase
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('profile')
                .upload(fileName, Buffer.from(profilePicFile.split(',')[1], 'base64'), {
                    contentType: mimeType,
                });

            if (storageError) {
                console.error('Failed to upload profile picture:', storageError);
                return NextResponse.json({ message: 'Failed to upload profile picture', error: storageError.message }, { status: 500 });
            }

            console.log("Profile pic uploaded successfully");

            // Retrieve public URL
            const { data: publicUrlData } = supabase
                .storage
                .from('profile')
                .getPublicUrl(fileName);

            profilePicUrl = publicUrlData.publicUrl;
            console.log("Profile pic URL:", profilePicUrl);
        } else {
            console.log("No profile pic file found in request");
        }

        // Merge the profilePicUrl into the userDetails object
        const updatedUserDetails = { ...userDetails, profile_pic: profilePicUrl || userDetails.profile_pic };
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

        return NextResponse.json({ message: 'User details and profile picture updated successfully', profilePicUrl, updatedData }, { status: 200 });

    } catch (error: any) {
        console.error('Error in PUT method:', error);
        return NextResponse.json({ message: 'Error processing the request', error: error.message }, { status: 500 });
    }
}
