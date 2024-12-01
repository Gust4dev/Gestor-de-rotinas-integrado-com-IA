import { useAuth } from '@/hooks/use-auth';
import { useTasks } from '@/hooks/use-tasks';
import { Layout, User, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/components/dashboard/calendar-view';
import { TaskList } from '@/components/dashboard/task-list';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  
  const completedTasks = tasks.filter((task) => task.completed).length;
  const upcomingEvents = 3; // Placeholder for demo

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Layout className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/settings">
                  <SettingsIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <StatsCard
            completedTasks={completedTasks}
            totalTasks={tasks.length}
            upcomingEvents={upcomingEvents}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CalendarView />
            </div>
            <div>
              <TaskList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}