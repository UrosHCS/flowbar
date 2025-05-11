import { useAsk } from '@/components/ai/useAsk';
import { Session } from '@supabase/supabase-js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Ask({ session }: { session: Session }) {
  const { ask, streamingMessage, isLoading } = useAsk(session);

  const [prompt, setPrompt] = useState('List 5 fruits');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    ask(prompt);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-row gap-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Ask'}
        </Button>
      </form>
      <div>{streamingMessage}</div>
    </div>
  );
}
