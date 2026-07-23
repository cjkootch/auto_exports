-- Vector Auto Exports — Neon schema
-- Run once against the new Neon database (NOT the Vex database):
--   psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS spec_requests (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  destination_port TEXT NOT NULL,
  category TEXT NOT NULL,
  spec TEXT NOT NULL,
  quantity TEXT NOT NULL,
  title_pref TEXT NOT NULL,
  notes TEXT,
  source_path TEXT,          -- which page/card the request came from
  utm JSONB                  -- capture utm_* params for lane attribution
);
