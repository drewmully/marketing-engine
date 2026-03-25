-- Run this in your Supabase SQL Editor to set up the database
-- Project → SQL Editor → New Query → Paste & Run

CREATE TABLE IF NOT EXISTS campaign_kv (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read/write (app uses anon key + simple password for edit mode)
ALTER TABLE campaign_kv ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON campaign_kv
  FOR SELECT USING (true);

CREATE POLICY "Allow public write" ON campaign_kv
  FOR ALL USING (true) WITH CHECK (true);
