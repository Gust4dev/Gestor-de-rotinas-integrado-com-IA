import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface StatsCardProps {
  completedTasks: number;
  totalTasks: number;
  upcomingEvents: number;
  totalHoursWorked: number;
}

export function StatsCard({ 
  completedTasks, 
  totalTasks, 
  upcomingEvents,
  totalHoursWorked 
}: StatsCardProps) {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Today's Overview</h2>
          <span className="text-sm text-muted-foreground">
            {format(new Date(), 'MMMM d, yyyy')}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-secondary/10 flex flex-col items-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-bold">{completionRate}%</span>
            <span className="text-sm text-muted-foreground">Task Completion</span>
            <span className="text-xs text-muted-foreground mt-1">
              {completedTasks} of {totalTasks} tasks
            </span>
          </div>
          <div className="p-4 rounded-lg bg-tertiary/10 flex flex-col items-center">
            <div className="rounded-full bg-tertiary/10 p-3 mb-3">
              <Calendar className="h-6 w-6 text-tertiary" />
            </div>
            <span className="text-2xl font-bold">{upcomingEvents}</span>
            <span className="text-sm text-muted-foreground">Upcoming Events</span>
            <span className="text-xs text-muted-foreground mt-1">
              Next 7 days
            </span>
          </div>
          <div className="p-4 rounded-lg bg-highlight/10 flex flex-col items-center">
            <div className="rounded-full bg-highlight/10 p-3 mb-3">
              <Clock className="h-6 w-6 text-highlight" />
            </div>
            <span className="text-2xl font-bold">{totalHoursWorked}h</span>
            <span className="text-sm text-muted-foreground">Hours Worked</span>
            <span className="text-xs text-muted-foreground mt-1">
              Today's total
            </span>
          </div>
          <div className="p-4 rounded-lg bg-accent/10 flex flex-col items-center">
            <div className="rounded-full bg-accent/10 p-3 mb-3">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <span className="text-2xl font-bold">
              {completionRate > 0 ? '+' : ''}{completionRate - 50}%
            </span>
            <span className="text-sm text-muted-foreground">vs. Average</span>
            <span className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}