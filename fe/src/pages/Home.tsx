import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { initialSettings } from '@/lib/supabase';
import {
  GlobalSettingsSchema,
  LibrarySchema,
  MenuSchema,
  Settings,
} from '@/schemas/schemas';
import { parseAndValidateJSON } from '@/lib/json';
import { Ask } from '@/components/ai/ask';
import {
  useGetUserSettings,
  useSaveUserSettings,
} from '@/components/user-settings/use-user-settings';

type Props = {
  session: Session;
};

export function Home({ session }: Props) {
  const { data, isLoading, error } = useGetUserSettings(session.user.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Ask session={session} />
      <LoadedHome session={session} settings={data ?? initialSettings} />
    </>
  );
}

type LoadedHomeProps = {
  session: Session;
  settings: Settings;
};

function LoadedHome({ session, settings }: LoadedHomeProps) {
  const [globalSettings, setGlobalSettings] = useState<string>(
    settings?.global ? JSON.stringify(settings.global, null, 2) : '{}',
  );
  const [menus, setMenus] = useState<string>(
    settings?.menus ? JSON.stringify(settings.menus, null, 2) : '[]',
  );
  const [library, setLibrary] = useState<string>(
    settings?.library ? JSON.stringify(settings.library, null, 2) : '{}',
  );

  const [localErrors, setLocalErrors] = useState({
    global: '',
    menus: '',
    library: '',
  });

  const { isPending, error, mutateAsync } = useSaveUserSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPending) return;

    await mutateAsync({
      user_id: session.user.id,
      global: JSON.parse(globalSettings),
      menus: JSON.parse(menus),
      library: JSON.parse(library),
    });
  };

  const updateGlobalSettings = (value: string) => {
    setGlobalSettings(value);
    const { error } = parseAndValidateJSON(value, GlobalSettingsSchema);
    setLocalErrors((prev) => ({ ...prev, global: error?.message ?? '' }));
  };

  const updateMenus = (value: string) => {
    setMenus(value);
    const { error } = parseAndValidateJSON(value, MenuSchema.array());
    setLocalErrors((prev) => ({ ...prev, menus: error?.message ?? '' }));
  };

  const updateLibrary = (value: string) => {
    setLibrary(value);
    const { error } = parseAndValidateJSON(value, LibrarySchema);
    setLocalErrors((prev) => ({ ...prev, library: error?.message ?? '' }));
  };

  const errorMessage =
    (error && error.message) ||
    Object.values(localErrors).filter(Boolean).join('\n');

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure your application settings</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="global">Global Settings</Label>
              <Textarea
                id="global"
                value={globalSettings}
                onChange={(e) => updateGlobalSettings(e.target.value)}
                placeholder="Enter global settings in JSON format"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menus">Menus</Label>
              <Textarea
                id="menus"
                value={menus}
                onChange={(e) => updateMenus(e.target.value)}
                placeholder="Enter menus in JSON format"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="library">Button Library</Label>
              <Textarea
                id="library"
                value={library}
                onChange={(e) => updateLibrary(e.target.value)}
                placeholder="Enter button library in JSON format"
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Settings'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
