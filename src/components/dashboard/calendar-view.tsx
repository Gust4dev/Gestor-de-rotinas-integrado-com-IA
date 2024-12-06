import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Settings,
  Calendar as CalendarIcon,
  Filter,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { CalendarSettings } from '@/components/calendar/calendar-settings';

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime?: string;
  description?: string;
}

interface CalendarViewProps {
  onDateSelect: (date: Date) => void;
}

export function CalendarView({ onDateSelect }: CalendarViewProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = direction === 'next' ? addDays(date, 1) : subDays(date, 1);
    handleDateChange(newDate);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.startTime) {
      setEvents([
        ...events,
        {
          id: Math.random().toString(36).substr(2, 9),
          title: newEvent.title,
          description: newEvent.description,
          date: date,
          startTime: newEvent.startTime,
          endTime: newEvent.endTime || undefined,
        },
      ]);
      setNewEvent({ title: '', description: '', startTime: '', endTime: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {format(date, 'MMMM d, yyyy')}
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              value={viewMode}
              onValueChange={(value: 'month' | 'week' | 'day') => setViewMode(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
              <CalendarIcon className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={() => setIsSettingsOpen(true)}>
              <Settings className="h-4 w-4" />
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                      id="description"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, description: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time (Optional)</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                    />
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={date.toISOString()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md border w-full"
            />
            <div className="space-y-4">
              <h3 className="font-medium">
                Events for {format(date, 'MMMM d, yyyy')}
              </h3>
              <ScrollArea className="h-[400px]">
                <AnimatePresence>
                  {events
                    .filter((event) => isSameDay(event.date, date))
                    .map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-3 rounded-lg bg-secondary/10 space-y-1 mb-2"
                      >
                        <h4 className="font-medium">{event.title}</h4>
                        {event.description && (
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.startTime}
                          {event.endTime && ` - ${event.endTime}`}
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </ScrollArea>
            </div>
          </motion.div>
        </AnimatePresence>

        <CalendarSettings
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
        />
      </Card>
    </motion.div>
  );
}