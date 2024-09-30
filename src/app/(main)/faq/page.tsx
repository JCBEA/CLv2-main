"use client";

import { useEffect, useState } from 'react';
import { fetchFAQs } from '@/services/faqservice';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFAQs = async () => {
      try {
        const data = await fetchFAQs();
        setFaqs(data);
      } catch (err) {
        setError('Failed to load FAQs.');
      }
    };

    getFAQs();
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="p-4 border rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold">{faq.question}</h2>
            <p className="text-lg mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FAQPage;
