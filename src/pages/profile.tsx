import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { User, Mail, Calendar } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>

              <Button className="w-full sm:w-auto">Update Profile</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-secondary/20">
                <Calendar className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">
                  Events This Month
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/20">
                <Mail className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-muted-foreground">
                  Task Completion
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/20">
                <User className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-muted-foreground">
                  Days Active
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}