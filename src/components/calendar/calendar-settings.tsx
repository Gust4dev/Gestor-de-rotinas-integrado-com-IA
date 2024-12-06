import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Calendar,
  CheckSquare,
  Lightbulb,
  Clock,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

interface CalendarSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CalendarSettings({ open, onOpenChange }: CalendarSettingsProps) {
  const [notifications, setNotifications] = useState({
    events: {
      beforeStart: true,
      onDayOf: true,
      reminders: true,
    },
    tasks: {
      upcoming: true,
      dueDate: true,
      overdue: true,
    },
    focus: {
      suggestions: true,
      insights: true,
      weeklyReport: true,
    },
  });

  const handleSaveSettings = () => {
    toast.success('Calendar settings saved successfully');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">Calendar Settings</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Events Notifications */}
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-medium">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3>Event Notifications</h3>
                  </div>
                  
                  <div className="space-y-4 pl-7">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Before event starts</span>
                      </Label>
                      <Switch
                        checked={notifications.events.beforeStart}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            events: { ...prev.events, beforeStart: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span>On the day of event</span>
                      </Label>
                      <Switch
                        checked={notifications.events.onDayOf}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            events: { ...prev.events, onDayOf: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Custom reminders</span>
                      </Label>
                      <Switch
                        checked={notifications.events.reminders}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            events: { ...prev.events, reminders: checked },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tasks Notifications */}
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-medium">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <h3>Task Notifications</h3>
                  </div>
                  
                  <div className="space-y-4 pl-7">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Upcoming tasks</span>
                      </Label>
                      <Switch
                        checked={notifications.tasks.upcoming}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            tasks: { ...prev.tasks, upcoming: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span>Due date reminders</span>
                      </Label>
                      <Switch
                        checked={notifications.tasks.dueDate}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            tasks: { ...prev.tasks, dueDate: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Overdue tasks</span>
                      </Label>
                      <Switch
                        checked={notifications.tasks.overdue}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            tasks: { ...prev.tasks, overdue: checked },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* FOCUS AI Notifications */}
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-medium">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h3>FOCUS AI Notifications</h3>
                  </div>
                  
                  <div className="space-y-4 pl-7">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span>AI Suggestions</span>
                      </Label>
                      <Switch
                        checked={notifications.focus.suggestions}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            focus: { ...prev.focus, suggestions: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                        <span>Productivity insights</span>
                      </Label>
                      <Switch
                        checked={notifications.focus.insights}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            focus: { ...prev.focus, insights: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Weekly AI report</span>
                      </Label>
                      <Switch
                        checked={notifications.focus.weeklyReport}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            focus: { ...prev.focus, weeklyReport: checked },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}