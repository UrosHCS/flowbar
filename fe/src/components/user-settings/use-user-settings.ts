import { supabase } from '@/lib/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';

async function fetchSettings(userId: string) {
  const { data } = await supabase
    .from('user_settings')
    .select('global, menus, library')
    .eq('user_id', userId)
    .maybeSingle()
    .throwOnError();

  return data;
}

async function upsertSettings(userSettingsWithUserId: Record<string, unknown>) {
  const { data } = await supabase
    .from('user_settings')
    .upsert(userSettingsWithUserId)
    .select()
    .single()
    .throwOnError();

  return data;
}

export function useGetUserSettings(userId: string) {
  return useQuery({
    queryKey: ['settings', userId],
    queryFn() {
      return fetchSettings(userId);
    },
  });
}

export function useSaveUserSettings() {
  const { data, mutateAsync, isPending, error } = useMutation({
    mutationFn: upsertSettings,
  });

  return {
    data,
    mutateAsync,
    isPending,
    error,
  };
}
