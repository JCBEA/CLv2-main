export interface RelatedWork {
    slug: string; // Changed from 'sluger' to 'slug' for consistency
    title: string;
    path: string;
    desc: string;
    artist: string;
    year: string;
}

export interface Artwork {
    slug: string;
    image_path: string;
    title: string;
    year: string;
    desc: string;
    artist: string;
    relatedWorks?: RelatedWork[];
}


export const fetchArtworks = async (): Promise<Artwork[]> => {
    try {
        const response = await fetch('/api/collections/guests'); // Ensure this path is correct
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.imageCollection.map((artwork: any) => {
            const relatedWorks = data.childCollection.filter((child: any) => {

                return child.sluger === artwork.slug;
            });

            console.log('Related Works for', artwork.slug, relatedWorks);

            return {
                slug: artwork.slug,
                image_path: artwork.image_path,
                title: artwork.title,
                year: artwork.year,
                desc: artwork.desc,
                artist: artwork.artist,
                relatedWorks: relatedWorks.map((child: any) => ({
                    slug: child.sluger,
                    title: child.title,
                    path: child.path,
                    desc: child.desc,
                    artist: child.artist,
                    year: child.year,
                })),
            };
        });
    } catch (error) {
        console.error('Failed to fetch artworks:', error);
        return [];
    }
};
