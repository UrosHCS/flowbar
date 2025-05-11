CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY NOT NULL,
  global JSONB NOT NULL DEFAULT '{}',
  menus JSONB NOT NULL DEFAULT '[]',
  library JSONB NOT NULL DEFAULT '{}',
  other JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE usages (
  user_id UUID PRIMARY KEY NOT NULL,
  available_tokens INTEGER NOT NULL DEFAULT 0,
  used_tokens INTEGER NOT NULL DEFAULT 0,
  remaining_tokens INTEGER GENERATED ALWAYS AS (available_tokens - used_tokens) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE prompt_history (
  user_id UUID PRIMARY KEY NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  request_response_duration INTEGER NOT NULL,
  tokens_used INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter table public.user_settings enable row level security;

create policy "Enable insert for users based on user_id"
on public.user_settings
for insert
to public
with check ((auth.uid() = user_id));

create policy "Enable select for users based on user_id"
on public.user_settings
for select
to public
using ((auth.uid() = user_id));

create policy "Enable update for users based on user_id"
on public.user_settings
for update
to public
using ((auth.uid() = user_id));
