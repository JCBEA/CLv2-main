import { notFound } from 'next/navigation';
import { supabase } from '@/services/supabaseClient'; // Adjust the import path as needed
import CollectionDisplay from './CollectionDisplay'; // Adjust the import path to your component

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
    const images = data.map(item => item.path);

    return {
      title: collection.title,
      description: collection.desc,
      images: images,
      artist: collection.artist,
      year: collection.year,
    };
  }

  return null;
}

export default async function ViewCollectionPage({ params }: { params: { slug: string } }) {
  const collection = await getCollection(params.slug);

  if (!collection) {
    notFound();
  }

  return <CollectionDisplay collection={collection} />;
}
