import { supabase } from './supabase.ts';
import { AuthError, User } from 'npm:@supabase/supabase-js';

type UserResult = {
  user: User;
  error: null;
} | {
  user: null;
  error: AuthError;
};

export async function getUserFromRequest(req: Request): Promise<UserResult> {
  // Validate user authentication
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const {
    data,
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    return { user: null, error };
  }

  return { user: data.user, error: null };
}
