# Flowbar

## FE

Just a sample app that shows how to use the backend.

## BE

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
