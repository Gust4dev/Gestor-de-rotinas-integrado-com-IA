import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subDays, format } from 'date-fns';
import { BarChart } from './charts/bar-chart';
import { LineChart } from './charts/line-chart';
import { Lightbulb } from 'lucide-react';

const generateMockData = (days: number) => {
  return Array.from({ length: days }).map((_, i) => ({
    date: format(subDays(new Date(), days - 1 - i), 'MMM dd'),
    completed: Math.floor(Math.random() * 10),
    cancelled: Math.floor(Math.random() * 5),
    productivity: Math.floor(Math.random() * 100),
  }));
};

export function MetricsSection() {
  const [period, setPeriod] = useState('7');
  const data = generateMockData(Number(period));

  const completedTotal = data.reduce((sum, day) => sum + day.completed, 0);
  const cancelledTotal = data.reduce((sum, day) => sum + day.cancelled, 0);
  const completionRate = Math.round(
    (completedTotal / (completedTotal + cancelledTotal)) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Progress Overview</h3>
          <Select
            value={period}
            onValueChange={setPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="10">Last 10 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium">Events Overview</h4>
              <div className="text-sm text-muted-foreground">
                Completion Rate: <span className="font-medium">{completionRate}%</span>
              </div>
            </div>
            <div className="h-[300px]">
              <BarChart data={data} />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Productivity Trend</h4>
            <div className="h-[300px]">
              <LineChart data={data} />
            </div>
          </div>

          <Card className="p-4 bg-secondary/10">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-secondary-foreground mb-2">
                  AI Insights (Coming Soon)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Future AI-powered insights about your productivity and suggestions
                  for improvement will appear here. Stay tuned for personalized
                  recommendations to help you achieve your goals more effectively.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </motion.div>
  );
}