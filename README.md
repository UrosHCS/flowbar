# Flowbar

## FE

Just a sample app that shows how to use the backend.

## BE

## Supabase commands

```bash
# Install & Setup
npm install -g supabase            # Install the Supabase CLI globally
brew install supabase/tap/supabase # Install the Supabase CLI globally
supabase login                     # Authenticate with your Supabase account
supabase init                      # Initialize Supabase project in current directory
supabase link --project-ref <ref>  # Link to a specific Supabase project by project ref

# Local Development
supabase start                     # Start local Postgres database and Supabase Studio
supabase stop                      # Stop the local Supabase dev environment

# Database Schema
supabase db diff --schema public --file migration.sql  # Generate a migration file from local schema changes
supabase db push                   # Apply local migrations to remote db
supabase db remote commit          # Create a migration and apply it directly to the remote DB

# Migrations
supabase migration new <name>      # Create a new empty migration file with given name
supabase db migrate                # Apply local migration files to local database

# Edge Functions
supabase functions new <name>      # Scaffold a new edge function
supabase functions serve           # Run an edge function locally for testing
supabase functions deploy <name>   # Deploy the edge function to your Supabase project

# Metadata & Secrets
supabase secrets set KEY=VALUE     # Set a secret (env var) for use in edge functions
supabase secrets list              # List all currently set secrets
supabase db dump                   # Dump the current schema and metadata into an SQL file
```

### TODO

[x] Supabase auth
[x] Ask AI serverless function
[x] Initial migration

login/register google, github, credentials

user_settings
user_id: FK
global: json
menus: json
button_library: json

endpoints:

GET /me (auth data, settings)

POST /settings (global, menus, button_library)

POST /ask - stream ai response
check tokens
body: {
"model": "gpt-4o", // openai
"prompt": "...",
}
increment token usage

other:
payments
manage subscriptions (add tokens)

////////////////
make this text more funny:
{userInput}
Don't add anything else, just the text.
////////////////

// browser prompt -> server
// server prompt -> openai
