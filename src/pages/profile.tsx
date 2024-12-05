import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { useTasks } from '@/hooks/use-tasks';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Calendar,
  Clock,
  Bell,
  Lock,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { format } from 'date-fns';

export default function Profile() {
  const { user, logout } = useAuth();
  const { tasks } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    birthDate: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      weekly: false,
    },
  });

  // Calculate statistics
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const totalHoursWorked = tasks.reduce((total, task) => {
    if (task.startTime && task.endTime) {
      const [startHour, startMinute] = task.startTime.split(':').map(Number);
      const [endHour, endMinute] = task.endTime.split(':').map(Number);
      const hours = endHour - startHour + (endMinute - startMinute) / 60;
      return total + (hours > 0 ? hours : 0);
    }
    return total;
  }, 0);

  const handleUpdateProfile = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Updating profile...',
        success: 'Profile updated successfully!',
        error: 'Failed to update profile',
      }
    );
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Updating password...',
        success: 'Password updated successfully!',
        error: 'Failed to update password',
      }
    );
    setShowPasswordDialog(false);
  };

  const handleDeleteAccount = () => {
    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Deleting account...',
        success: 'Account deleted successfully',
        error: 'Failed to delete account',
      }
    );
    setShowDeleteDialog(false);
    logout();
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
                  onClick={() => toast.info('Photo upload coming soon!')}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                    disabled={!isEditing}
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
                  disabled={!isEditing}
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
                    >
                      Update Profile
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
              <div className="p-4 rounded-lg bg-secondary/20">
                <CheckCircle className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">{completedTasks}</div>
                <div className="text-sm text-muted-foreground">
                  Completed Tasks
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/20">
                <AlertCircle className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">{pendingTasks}</div>
                <div className="text-sm text-muted-foreground">
                  Pending Tasks
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/20">
                <Clock className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">
                  {Math.round(totalHoursWorked)}h
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Hours Worked
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/20">
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

          {/* Security & Notifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Security & Notifications
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive email updates about your activity
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        email: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive push notifications about your activity
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        push: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Summary</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive a weekly summary of your activity
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.weekly}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        weekly: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordDialog(true)}
                  className="w-full sm:w-auto mb-4"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
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
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </Card>
        </motion.div>
      </main>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Please enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}