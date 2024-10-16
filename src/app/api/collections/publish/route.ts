// File: api/collections/publish.tsx

import { supabase } from '@/services/supabaseClient';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export async function PUT(request: Request) {
  const headers = request.headers;
  const userId = headers.get("user-id");

  // Check if userId is provided
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }
  
  const formData = await request.formData();
  const title = formData.get("title");
  const desc = formData.get("desc");
  const year = formData.get("year");
  const artist = formData.get("artist");
  const imageFile = formData.get("image");

  const dataYear = formData.get("year")
  const slugid = uuidv4();
  const slug =`${dataYear}-${slugid}`
  // Validate required fields
  if (!title || !desc || !year || !artist || !imageFile) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Check if imageFile is a valid Blob object
  if (!(imageFile instanceof Blob)) {
    return NextResponse.json({ error: 'Invalid image file.' }, { status: 400 });
  }

  console.log('Headers:', headers);
  console.log('User ID:', userId);
  console.log('Title:', title);
  console.log('Description:', desc);
  console.log('Year:', year);
  console.log('Artist:', artist);
  console.log('Image File:', imageFile);

  // Upload the image to Supabase Storage
  const uniqueFileName = `${Date.now()}-${imageFile.name}`;
  const { error: imageUploadError } = await supabase.storage
    .from('Images_File')
    .upload(uniqueFileName, imageFile);

  if (imageUploadError) {
    console.error('Image Upload Error:', imageUploadError);
    return NextResponse.json({ error: imageUploadError.message }, { status: 500 });
  }

  // Get the public URL for the uploaded image
  const { data } = supabase.storage.from('Images_File').getPublicUrl(uniqueFileName);

  // Check if data is available and contains publicUrl
  if (!data || !data.publicUrl) {
    console.error('Error retrieving image URL.');
    return NextResponse.json({ error: 'Error retrieving image URL.' }, { status: 500 });
  }

  const publicURL = data.publicUrl; // Access publicUrl directly
  console.log('Image Path:', publicURL);

  // Insert the record into the database
  const { data: insertData, error: insertError } = await supabase
    .from('image_collections') // replace with your actual table name
    .insert([{ id: userId, title, desc, year, artist,slug, image_path: publicURL }]);

  if (insertError) {
    console.error('Insert Error:', insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  const { data: insertData2, error: insertError2 } = await supabase
    .from('child_collection') // replace with your actual table name
    .insert([{ childid: userId, title, desc, year, artist,sluger:slug, path: publicURL }]);

    if (insertError2) {
      console.error('Insert Error:', insertError);
      return NextResponse.json({ error: insertError2.message }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Gallery item published successfully!', data: insertData, data1: insertData2 });
  
}
