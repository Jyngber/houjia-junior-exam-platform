-- Core schema for Houjia Junior High Online Exam Platform
create extension if not exists pgcrypto;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text not null,
  status text not null default 'uploaded' check (status in ('uploaded','processing','ready','failed')),
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.question_banks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references public.documents(id) on delete set null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  grade text,
  subject text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  bank_id uuid not null references public.question_banks(id) on delete cascade,
  type text not null check (type in ('single','multiple','blank','short')),
  content text not null,
  options jsonb not null default '[]'::jsonb,
  answer jsonb not null,
  explanation text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  student_class text,
  student_number text,
  student_name text,
  bank_id uuid not null references public.question_banks(id) on delete cascade,
  mode text not null check (mode in ('practice','exam')),
  score numeric(5,2) not null default 0,
  total_questions integer not null,
  user_answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);

alter table public.documents enable row level security;
alter table public.question_banks enable row level security;
alter table public.questions enable row level security;
alter table public.quiz_records enable row level security;

create policy "documents owner access" on public.documents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "banks owner or published read" on public.question_banks for select using (published = true or auth.uid() = owner_id);
create policy "banks owner write" on public.question_banks for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "questions published or owner read" on public.questions for select using (exists (select 1 from public.question_banks b where b.id = bank_id and (b.published = true or b.owner_id = auth.uid())));
create policy "questions owner write" on public.questions for all using (exists (select 1 from public.question_banks b where b.id = bank_id and b.owner_id = auth.uid())) with check (exists (select 1 from public.question_banks b where b.id = bank_id and b.owner_id = auth.uid()));
create policy "quiz records self access" on public.quiz_records for all using (user_id is null or auth.uid() = user_id) with check (user_id is null or auth.uid() = user_id);
