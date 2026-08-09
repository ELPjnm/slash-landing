# Database Migrations

This directory contains SQL migration scripts for the Slash landing page database.

## Migrations

### 001-create-waitlist-table.sql
Creates the initial waitlist table with:
- `id` (UUID, auto-generated)
- `email` (TEXT, unique)
- `created_at` (timestamp)
- Indexes on email and created_at

### 002-add-waitlist-rls-policies.sql
**IMPORTANT: Run this migration to fix waitlist insert issues**

Adds Row Level Security (RLS) policies to the waitlist table:
- Enables RLS on the waitlist table
- Allows anonymous users to INSERT emails (required for the waitlist form)
- Allows anonymous users to SELECT from the table

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `002-add-waitlist-rls-policies.sql`
4. Click **Run** to execute the migration

### Option 2: Supabase CLI
```bash
# If you have the Supabase CLI installed
supabase db execute --file scripts/002-add-waitlist-rls-policies.sql
```

### Option 3: psql
```bash
# Connect to your Supabase database using psql
psql "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres" -f scripts/002-add-waitlist-rls-policies.sql
```

## Troubleshooting

### Waitlist form not working after enabling RLS?
Run migration `002-add-waitlist-rls-policies.sql` to add the necessary policies that allow anonymous users to insert emails into the waitlist.

### Testing the policies
After applying the migration, test by submitting an email through the waitlist form. It should work without authentication.
