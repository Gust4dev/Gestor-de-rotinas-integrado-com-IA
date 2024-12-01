import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import { Settings as SettingsIcon, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Appearance</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">
                    Toggle between light and dark mode
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? 'dark' : 'light')
                    }
                  />
                  <Moon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable or disable push notifications
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <div className="mt-6">
            <Button variant="destructive" className="w-full sm:w-auto">
              Delete Account
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}