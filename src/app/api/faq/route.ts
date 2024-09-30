// app/api/faq/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const faqs = [
    { id: '1', question: 'What is Creative Legazpi?', answer: 'Creative Legazpi is a platform for showcasing creative talents.' },
    { id: '2', question: 'How can I join?', answer: 'You can join by registering on our website.' },
    { id: '3', question: 'Is there a membership fee?', answer: 'No, joining Creative Legazpi is free of charge.' },
  ];

  return NextResponse.json(faqs);
}
