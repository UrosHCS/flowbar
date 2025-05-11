import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { Home } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <>
      <nav className="p-4 flex justify-end">
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          Sign out
        </Button>
      </nav>
      <Home session={session} />
    </>
  );
}
