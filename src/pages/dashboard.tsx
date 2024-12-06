import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useTasks } from '@/hooks/use-tasks';
import { Layout, User, Settings as SettingsIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/components/dashboard/calendar-view';
import { TaskList } from '@/components/dashboard/task-list';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const completedTasks = tasks.filter((task) => task.completed).length;
  const upcomingEvents = 3;
  
  const totalHoursWorked = tasks.reduce((total, task) => {
    if (task.startTime && task.endTime) {
      const [startHour, startMinute] = task.startTime.split(':').map(Number);
      const [endHour, endMinute] = task.endTime.split(':').map(Number);
      const hours = endHour - startHour + (endMinute - startMinute) / 60;
      return total + (hours > 0 ? hours : 0);
    }
    return total;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Layout className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">FOCUS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/about">
                  <Info className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </Button>
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
            totalHoursWorked={Math.round(totalHoursWorked * 10) / 10}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CalendarView onDateSelect={setSelectedDate} />
            </div>
            <div>
              <TaskList selectedDate={selectedDate} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}