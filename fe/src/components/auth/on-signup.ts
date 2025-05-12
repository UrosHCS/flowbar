import { Session } from '@supabase/supabase-js';
import { config } from '@/config/config';

export async function onSignup(session: Session): Promise<void> {
  try {
    const res = await fetch(`${config.api.baseUrl}/on-signup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!res.ok) {
      console.error(`res text: ${await res.text()}`);
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
