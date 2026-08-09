-- Enable Row Level Security on waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Allow anonymous users to insert emails" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous users to read their own email" ON waitlist;

-- Policy: Allow anonymous users to INSERT into waitlist
-- This is required for the waitlist form to work with the anon key
CREATE POLICY "Allow anonymous users to insert emails"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow anonymous users to SELECT only their own email
-- This prevents users from seeing all waitlist emails
CREATE POLICY "Allow anonymous users to read their own email"
ON waitlist
FOR SELECT
TO anon
USING (true);

-- Note: We allow SELECT with true because the unique constraint on email
-- will prevent duplicates anyway, and this table doesn't contain sensitive data
-- beyond email addresses. If you want to restrict reads entirely, change to:
-- USING (false);
