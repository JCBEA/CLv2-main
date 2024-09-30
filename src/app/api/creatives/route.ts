import { NextResponse } from 'next/server';

export async function GET() {
  const creatives = [
    { id: '1', name: 'John Doe', skill: 'Graphic Design', bio: 'Experienced designer based in Legazpi' },
    { id: '2', name: 'Jane Smith', skill: 'Illustration', bio: 'Freelance illustrator specializing in children\'s books' },
    { id: '3', name: 'sean Smith', skill: 'Illustration', bio: 'Freelance illustrator specializing in children\'s books' },
    // Add more mock creatives
  ];
  
  return NextResponse.json(creatives);
}
