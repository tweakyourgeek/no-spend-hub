-- Guide Responses table for No Spend Mini Guides
-- Stores user responses keyed by user_id + guide_id + field_id
-- Supports upsert so saving the same field twice updates rather than duplicates

create table if not exists public.guide_responses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  guide_id text not null,
  field_id text not null,
  value text not null default '',
  updated_at timestamptz default now() not null,

  -- Unique constraint enables upsert on user + guide + field
  constraint guide_responses_unique_field unique (user_id, guide_id, field_id)
);

-- Index for fast lookups by user + guide
create index if not exists idx_guide_responses_user_guide
  on public.guide_responses (user_id, guide_id);

-- Enable Row Level Security
alter table public.guide_responses enable row level security;

-- Users can only read their own rows
create policy "Users can read own guide responses"
  on public.guide_responses for select
  using (auth.uid() = user_id);

-- Users can only insert their own rows
create policy "Users can insert own guide responses"
  on public.guide_responses for insert
  with check (auth.uid() = user_id);

-- Users can only update their own rows
create policy "Users can update own guide responses"
  on public.guide_responses for update
  using (auth.uid() = user_id);

-- Users can only delete their own rows
create policy "Users can delete own guide responses"
  on public.guide_responses for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at on row change
create or replace function public.update_guide_responses_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger guide_responses_updated_at
  before update on public.guide_responses
  for each row
  execute function public.update_guide_responses_updated_at();
