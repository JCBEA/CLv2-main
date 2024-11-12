import { notFound } from 'next/navigation';
import { supabase } from '@/services/supabaseClient'; // Adjust the import path as needed
import {CollectionDisplay} from './CollectionDisplay'; // Adjust the import path to your component


// Define the CollectionProps interface

async function getCollection(slug: string) {
  const { data, error } = await supabase
    .from('child_collection')
    .select('*')
    .eq('sluger', slug);

  if (error) {
    console.error('Error fetching collection:', error);
    return null;
  }

  if (data && data.length > 0) {
    const collection = data[0];
    const images = data.map(item => ({
      created_at: item.created_at,
      generatedId: item.generatedId,
      image_path: item.path,
      title: item.title,
      desc: item.desc,
      artist: item.artist,
      year: item.year,
      childid: item.childid
    }));

    return {
      collection: { images },
    };
  }

  return null;
}





export default async function ViewCollectionPage({ params }: { params: { slug: string } }) {
  const collectionData = await getCollection(params.slug);

  if (!collectionData) {
    notFound();
  }

  return (
    <div className='h-fit w-full py-[15dvh] max-w-[80%] mx-auto'>
      <CollectionDisplay collection={collectionData.collection} />
    </div>
  )
}
