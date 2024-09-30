import { NextResponse } from 'next/server';

export async function GET() {
  const galleryItems = [
    { id: '1', title: 'Creative Artwork 1', imageUrl: '/assets/images/artwork1.jpg' },
    { id: '2', title: 'Creative Artwork 2', imageUrl: '/assets/images/artwork2.jpg' },
    { id: '3', title: 'Creative Artwork 3', imageUrl: '/assets/images/artwork3.jpg' },
  ];

  return NextResponse.json(galleryItems);
}
