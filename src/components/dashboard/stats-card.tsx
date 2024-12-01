import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock } from 'lucide-react';

interface StatsCardProps {
  completedTasks: number;
  totalTasks: number;
  upcomingEvents: number;
}

export function StatsCard({ completedTasks, totalTasks, upcomingEvents }: StatsCardProps) {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-secondary/10 flex flex-col items-center">
            <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
            <span className="text-2xl font-bold">{completionRate}%</span>
            <span className="text-sm text-muted-foreground">Task Completion</span>
          </div>
          <div className="p-4 rounded-lg bg-tertiary/10 flex flex-col items-center">
            <Calendar className="h-8 w-8 text-tertiary mb-2" />
            <span className="text-2xl font-bold">{upcomingEvents}</span>
            <span className="text-sm text-muted-foreground">Upcoming Events</span>
          </div>
          <div className="p-4 rounded-lg bg-highlight/10 flex flex-col items-center">
            <Clock className="h-8 w-8 text-highlight mb-2" />
            <span className="text-2xl font-bold">{totalTasks}</span>
            <span className="text-sm text-muted-foreground">Total Tasks</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}