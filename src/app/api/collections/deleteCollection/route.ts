import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

// Define the DELETE method handler
export async function DELETE(req: Request) {
  try {
    const { generatedId, userId, image_path } = await req.json();

    if (!generatedId) {
      return NextResponse.json({ error: 'generatedId is required' }, { status: 400 });
    }

    // Fetch the child record before deleting it
    const { data: childRecord, error: fetchError } = await supabase
      .from('child_collection')
      .select('*') // Select all fields
      .eq('generatedId', generatedId)
      .eq('childid', userId)
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!childRecord) {
      return NextResponse.json({ error: 'No record found to delete' }, { status: 404 });
    }

    // Delete the child record
    const { error: deleteChildError } = await supabase
      .from('child_collection')
      .delete()
      .eq('generatedId', generatedId)
      .eq('childid', userId);

    if (deleteChildError) {
      console.error('Delete child error:', deleteChildError);
      return NextResponse.json({ error: deleteChildError.message }, { status: 500 });
    }

    // Handle image deletion from storage
    if (!image_path) {
      console.error('Error: No image_path found');
      return NextResponse.json({ error: 'No image_path found' }, { status: 500 });
    }

    console.log(`Attempting to delete image at path: ${image_path}`);

    const { error: deleteImageError } = await supabase.storage
      .from('Images_File')
      .remove([image_path.split('/').pop()]);

    if (deleteImageError) {
      console.error('Delete image from storage error:', deleteImageError);
      return NextResponse.json({ error: deleteImageError.message }, { status: 500 });
    }

    console.log(`Image at path ${image_path} deleted from Images_File bucket.`);

    // Fetch all remaining child records for the user
    const { data: remainingChildRecords, error: fetchRemainingError } = await supabase
      .from('child_collection')
      .select('*')
      .eq('childid', userId);

    if (fetchRemainingError) {
      console.error('Fetch remaining child records error:', fetchRemainingError);
      return NextResponse.json({ error: fetchRemainingError.message }, { status: 500 });
    }



    // Check if there are any remaining child records
    const { count: updatedChildCount, error: updatedCountError } = await supabase
      .from('child_collection')
      .select('childid', { count: 'exact' })
      .eq('childid', userId);

    if (updatedCountError) {
      console.error('Updated count error:', updatedCountError);
      return NextResponse.json({ error: updatedCountError.message }, { status: 500 });
    }

        // Update image collections based on remaining child records
        const updatedData = {
            // You can modify this logic based on how you want to update image_collections
            // For example, you can aggregate data or take the first record, etc.
            created_at: remainingChildRecords[0]?.created_at,
            title: remainingChildRecords[0]?.title,
            artist: remainingChildRecords[0]?.artist,
            year: remainingChildRecords[0]?.year,
            image_path: remainingChildRecords[0]?.path,
            desc: remainingChildRecords[0]?.desc,
          };
      if(updatedChildCount != 0){
          const { error: updateImageCollectionError } = await supabase
            .from('image_collections')
            .update(updatedData) // Update with the new data
            .eq('id', userId);
      
          if (updateImageCollectionError) {
            console.error('Update image collection error:', updateImageCollectionError);
            return NextResponse.json({ error: updateImageCollectionError.message }, { status: 500 });
          }
      
          console.log(`Updated image collection with new data from remaining child records:`, updatedData);
        }


    if (updatedChildCount === 0) {
      const { error: deleteImageCollectionError } = await supabase
        .from('image_collections')
        .delete()
        .eq('id', userId);

      if (deleteImageCollectionError) {
        console.error('Delete image from image_collections error:', deleteImageCollectionError);
        return NextResponse.json({ error: deleteImageCollectionError.message }, { status: 500 });
      }
      console.log(`Image with id ${userId} deleted from image_collections.`);
    } else {
      console.log(`Not deleting image from image_collections as there are still child records remaining: ${updatedChildCount}`);
    }

    return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
