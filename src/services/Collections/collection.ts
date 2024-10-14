// service/Collection

import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { getSession } from '@/services/authservice';
import { jwtVerify } from 'jose';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

interface ImageCollection {
  id: string;
  title: string;
  created_at: string;
  artist: string;
  image_path: string;
  desc: string;
  slug: string;
  year: string;
}

export function useImageCollectionSubscription() {
    const [getCollection, setCollection] = useState<ImageCollection[]>([]);
  
    useEffect(() => {
      const subscription = supabase
        .channel('articles')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'image_collections',
        }, (payload: any) => {
          setCollection(prev => [...prev, payload.new]);
        })
        .subscribe();
      
      return () => {
        supabase.removeChannel(subscription);
      };
    }, []);
  
    useEffect(() => {
        const fetchCollection = async () => {
          const token = getSession();
          if (token) {
            try {
              const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
              const userIdFromToken = payload.id as string;
    
              const response = await fetch('/api/collections', {
                method: 'GET',
                headers: {
                  'Authorization': userIdFromToken,
                },
              });
    
              if (!response.ok) {
                throw new Error('Failed to fetch collections');
              }
    
              const data = await response.json();
              console.log("Fetched collections:", data); // Check the data structure
              setCollection(data || []); // Default to an empty array
    
            } catch (err) {
              console.error('Error fetching collections:', err);
            }
          } else {
            console.warn('No token found');
          }
        };
    
        fetchCollection();
      }, []);
    return getCollection;
  }