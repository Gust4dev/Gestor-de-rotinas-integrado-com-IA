import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { DeleteAccountDialog } from '@/components/delete-account-dialog';
import { useAuth } from '@/hooks/use-auth';
import { useTasks } from '@/hooks/use-tasks';
import {
  User,
  Mail,
  Calendar,
  Clock,
  Bell,
  Lock,
  Upload,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { format } from 'date-fns';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { tasks } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    birthDate: '',
    notifications: {
      email: true,
      push: true,
      weekly: false,
    },
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const handleUpdateProfile = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
      });
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

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
          {/* Profile Information */}
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                className="ml-auto"
                onClick={() => setIsEditing(!isEditing)}
                disabled={isUpdating}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing || isUpdating}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing || isUpdating}
                />
              </div>

              <div>
                <Label htmlFor="birthDate">Birth Date</Label>
                <div className="relative">
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    disabled={!isEditing || isUpdating}
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  disabled={!isEditing || isUpdating}
                  className="h-24"
                />
              </div>

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Button
                      onClick={handleUpdateProfile}
                      className="w-full sm:w-auto"
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-secondary/10">
                <CheckCircle className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">{completedTasks}</div>
                <div className="text-sm text-muted-foreground">
                  Completed Tasks
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10">
                <AlertCircle className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">{pendingTasks}</div>
                <div className="text-sm text-muted-foreground">
                  Pending Tasks
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10">
                <Clock className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">
                  {Math.round(tasks.reduce((total, task) => {
                    if (task.startTime && task.endTime) {
                      const [startHour, startMinute] = task.startTime.split(':').map(Number);
                      const [endHour, endMinute] = task.endTime.split(':').map(Number);
                      const hours = endHour - startHour + (endMinute - startMinute) / 60;
                      return total + (hours > 0 ? hours : 0);
                    }
                    return total;
                  }, 0))}h
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Hours Worked
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10">
                <Calendar className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">
                  {format(new Date(), 'd')}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Days
                </div>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-destructive/50">
            <h3 className="text-lg font-semibold text-destructive mb-4">
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Account
            </Button>
          </Card>
        </motion.div>
      </main>

      <DeleteAccountDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </div>
  );
}