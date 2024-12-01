import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarView() {
  const [date, setDate] = useState<Date>(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(date);
    if (direction === 'prev') {
      newDate.setMonth(date.getMonth() - 1);
    } else {
      newDate.setMonth(date.getMonth() + 1);
    }
    setDate(newDate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Calendar</h2>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border"
        />
      </Card>
    </motion.div>
  );
}