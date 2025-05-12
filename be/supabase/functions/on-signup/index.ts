import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import {
  noContentResponse,
  unauthorizedErrorResponse,
} from '../../lib/response.ts';
import { supabase } from '../../lib/supabase.ts';
import { middleware } from '../../lib/middleware.ts';
import { getUserFromRequest } from '../../lib/auth.ts';

Deno.serve(middleware(handle));

async function handle(req: Request) {
  const { user, error } = await getUserFromRequest(req);

  if (error) {
    return unauthorizedErrorResponse(error.message, error.code);
  }

  await initializeUserData(user.id);

  return noContentResponse();
}

async function initializeUserData(userId: string) {
  const { error: insertError } = await supabase.from('usages').insert({
    user_id: userId,
    available_tokens: 0,
    used_tokens: 0,
  });

  if (insertError) {
    console.warn(
      'Function on-signup called more than once for user',
      userId,
    );
  }
}
