// Supabase Configuration
// Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://ptkiyekunwlnwbsrkrqc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0a2l5ZWt1bndsbndic3JrcnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTI2ODAsImV4cCI6MjA3ODY4ODY4MH0.dzJ51Fbz41E5Hpmt5OZKajeOlMC6PWkKL3N30V010Z8';

// Initialize Supabase client with email confirmation disabled for login
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});
