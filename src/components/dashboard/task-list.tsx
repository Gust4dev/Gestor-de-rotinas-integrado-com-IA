import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTasks } from '@/hooks/use-tasks';
import { CheckCircle2, Plus, X } from 'lucide-react';

export function TaskList() {
  const { tasks, toggleTask, addTask, removeTask } = useTasks();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
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

        <form onSubmit={handleAddTask} className="mb-4 flex space-x-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="secondary">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <ScrollArea className="h-[calc(100%-8rem)] pr-4">
          <div className="space-y-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/10 group hover:bg-secondary/20 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span
                  className={`flex-1 text-sm ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => removeTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
}