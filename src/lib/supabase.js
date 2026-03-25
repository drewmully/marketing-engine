import { createClient } from "@supabase/supabase-js";

// Support both VITE_ (Vite standard) and NEXT_PUBLIC_ (Vercel-Supabase integration) prefixes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Simple key-value store in Supabase
// Table: campaign_kv (key TEXT PRIMARY KEY, value JSONB, updated_at TIMESTAMPTZ)

export async function getValue(key) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("campaign_kv")
    .select("value")
    .eq("key", key)
    .single();
  if (error) return null;
  return data?.value ?? null;
}

export async function setValue(key, value) {
  if (!supabase) return false;
  const { error } = await supabase.from("campaign_kv").upsert(
    { key, value, updated_at: new Date().toISOString() },
    { onConflict: "key" }
  );
  return !error;
}
