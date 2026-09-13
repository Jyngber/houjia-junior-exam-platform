# Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run `migrations/001_core_schema.sql`.
3. Create a private Storage bucket named `documents`.
4. Add Storage policies so authenticated users can upload/read only their own files.
5. Configure the frontend with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

The existing Vite MVP remains available while the backend foundation is introduced on `feature/core-platform-v1`.
