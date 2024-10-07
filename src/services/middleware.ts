// middleware/authMiddleware.ts
import { NextResponse } from 'next/server';
import { decryptToken } from '@/services/authservice';
import { supabase } from '@/services/supabaseClient';

export const authenticate = async (token: string) => {
  try {
    const payload = await decryptToken(token);
    
    // Check if user exists in the database
    const { data, error } = await supabase
      .from('users')
      .select('id, username')
      .eq('id', payload.id)
      .eq('username', payload.username)
      .single();
    
    if (error || !data) {
      return false; // User not found
    }
    
    return true; // User is authenticated
  } catch (error) {
    console.error('Authentication error:', error);
    return false; // Token decryption failed
  }
};
