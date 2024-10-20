import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function PUT(req: Request) {
  try {
    const token = req.headers.get('userId');
    if (!token) {
      return NextResponse.json({ error: 'Missing authorization token' }, { status: 401 });
    }

    // Parse the incoming form data
    const formData = await req.formData();
    const imageBefore = formData.get('imageBefore'); // The path of the previous image
    const updatedData = {
      title: formData.get('title'),
      desc: formData.get('desc'),
      year: formData.get('year'),
      artist: formData.get('artist'),
      image: formData.get('image'), // Assuming this is a File
      created_at: formData.get('created_at'), // Include created_at for the update condition
    };

    if (!updatedData.title || !updatedData.year || !updatedData.desc) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!(updatedData.image instanceof Blob)) {
      return NextResponse.json({ error: 'Invalid image file.' }, { status: 400 });
    }

    // Generate a unique file name for the new image
    const uniqueFileName = `${Date.now()}-${updatedData.image.name}`;

    // Upload the new image to Supabase Storage with no-cache control
    const { error: uploadError } = await supabase
      .storage
      .from('Images_File')
      .upload(uniqueFileName, updatedData.image, {
        cacheControl: 'no-cache', // Ensure no caching of this image
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase
      .storage
      .from('Images_File')
      .getPublicUrl(uniqueFileName);

    // Append a timestamp to the public URL for cache-busting
    const publicUrl = `${publicUrlData.publicUrl}?v=${Date.now()}`;

    // Fetch the oldest record in the child_collection
    const { data: oldestChildData, error: oldestChildError } = await supabase
      .from('child_collection')
      .select('created_at')
      .order('created_at', { ascending: true })
      .limit(1);

    if (oldestChildError || !oldestChildData.length) {
      return NextResponse.json({ error: 'Error fetching the oldest child collection record' }, { status: 500 });
    }

    const oldestCreatedAt = oldestChildData[0].created_at;

    // Update the child_collection record
    const { data: childData, error: childError } = await supabase
      .from('child_collection')
      .update({
        path: publicUrl, // Use the public URL with cache-busting query string
        year: updatedData.year,
        title: updatedData.title,
        artist: updatedData.artist,
        desc: updatedData.desc,
      })
      .eq('childid', token)
      .eq('created_at', updatedData.created_at);

    if (childError) {
      return NextResponse.json({ error: childError.message }, { status: 500 });
    }

    // Update image_collections if this is the oldest record
    if (updatedData.created_at === oldestCreatedAt) {
      const { data: imageData, error: imageError } = await supabase
        .from('image_collections')
        .update({
          image_path: publicUrl,
          year: updatedData.year,
          title: updatedData.title,
          artist: updatedData.artist,
          desc: updatedData.desc,
        })
        .eq('id', token);

      if (imageError) {
        return NextResponse.json({ error: imageError.message }, { status: 500 });
      }
    }

    // Remove the old image from Supabase storage
    if (typeof imageBefore === 'string') {
      const imagePath = imageBefore.split('/').pop();

      if (imagePath) {
        const { error: deleteError } = await supabase
          .storage
          .from('Images_File')
          .remove([imagePath]);

        if (deleteError) {
          return NextResponse.json({ error: `Failed to delete previous image: ${deleteError.message}` }, { status: 500 });
        }
      }
    }

    // Set Cache-Control headers in the response to prevent browser caching
    const response = NextResponse.json({
      message: 'Collection and image updated successfully',
      updatedChildCollection: childData,
    });
    
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Expires', '0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;

  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
