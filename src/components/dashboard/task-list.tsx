import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTasks } from '@/hooks/use-tasks';
import { CheckCircle2, Plus, X, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface NewTask {
  title: string;
  startTime: string;
  endTime: string;
}

export function TaskList() {
  const { tasks, toggleTask, addTask, removeTask } = useTasks();
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    startTime: '',
    endTime: '',
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.startTime) {
      addTask({
        title: newTask.title.trim(),
        startTime: newTask.startTime,
        endTime: newTask.endTime,
      });
      setNewTask({ title: '', startTime: '', endTime: '' });
    }
  };

  const getMotivationalMessage = () => {
    const completedCount = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    
    if (totalTasks === 0) return "Ready to start your day?";
    if (completedCount === totalTasks) return "Amazing job! All tasks completed! 🎉";
    if (completedCount / totalTasks > 0.5) return "You're on fire! Keep going! 🔥";
    return "You've got this! One task at a time! 💪";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="h-full"
    >
      <Card className="p-6 h-full">
        <div className="flex items-center space-x-2 mb-6">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Today's Tasks</h2>
        </div>

        <form onSubmit={handleAddTask} className="space-y-4 mb-4">
          <Input
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="time"
                value={newTask.startTime}
                onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                placeholder="Start time"
              />
            </div>
            <div className="flex-1">
              <Input
                type="time"
                value={newTask.endTime}
                onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                placeholder="End time (optional)"
              />
            </div>
            <Button type="submit" size="icon" variant="secondary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="text-sm text-muted-foreground mb-4 text-center">
          {getMotivationalMessage()}
        </div>

        <ScrollArea className="h-[calc(100%-12rem)] pr-4">
          <AnimatePresence>
            <div className="space-y-4">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    task.completed
                      ? 'bg-primary/10 text-primary'
                      : 'bg-secondary/10 hover:bg-secondary/20'
                  } group`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div className="flex-1 space-y-1">
                    <span
                      className={`text-sm ${
                        task.completed ? 'line-through' : ''
                      }`}
                    >
                      {task.title}
                    </span>
                    {(task.startTime || task.endTime) && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.startTime}
                        {task.endTime && ` - ${task.endTime}`}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </ScrollArea>
      </Card>
    </motion.div>
  );
}