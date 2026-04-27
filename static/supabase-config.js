// static/supabase-config.js

// Initialize Supabase Client
const SUPABASE_URL = 'https://ulasflnseqnzggtbcbth.supabase.co';

// ⚠️ IMPORTANT: Replace the string below with your actual Supabase anon public API key!
// You can find this in your Supabase Dashboard -> Project Settings -> API
const SUPABASE_ANON_KEY = 'sb_publishable_Zp1BjdwjH_XKalNYwpPC8w_PgQBWb4w';

// Create a single supabase client for interacting with your database
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to check if user is logged in
async function getCurrentUser() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Error getting session:", error);
        return null;
    }
    return session ? session.user : null;
}
