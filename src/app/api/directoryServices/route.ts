import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
    const userId = req.headers.get('User-ID');

    if (!userId) {
        return NextResponse.json({ error: 'User-ID header is required' }, { status: 400 });
    }

    // Query to check existence without retrieving all data
    const { count, error } = await supabase
        .from('image_collections')
        .select('id', { count: 'exact', head: true })
        .eq('id', userId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check for null count and set exists to false if count is null
    const exists = count != null && count > 0;
    return NextResponse.json({ exists });
}
