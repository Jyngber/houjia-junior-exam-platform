create table if not exists public.users (
  id uuid primary key,
  email text not null unique,
  role text not null check (role in ('teacher', 'student')),
  class_name text,
  seat_number integer,
  student_id text,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text not null,
  grade text not null,
  subject text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.question_banks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  title text not null,
  description text,
  grade text not null,
  subject text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  bank_id uuid not null references public.question_banks(id) on delete cascade,
  type text not null check (type in ('single', 'multiple', 'blank', 'short')),
  content text not null,
  options jsonb not null default '[]'::jsonb,
  answer jsonb not null,
  explanation text,
  source_excerpt text
);

create table if not exists public.quiz_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  bank_id uuid not null references public.question_banks(id) on delete cascade,
  mode text not null check (mode in ('practice', 'exam')),
  score numeric not null,
  total_questions integer not null,
  user_answers jsonb not null,
  completed_at timestamptz not null default now()
);
