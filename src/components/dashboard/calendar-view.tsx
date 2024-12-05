import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addDays } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime?: string;
  description?: string;
}

type ViewType = 'month' | 'week' | 'day';

export function CalendarView() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [viewType, setViewType] = useState<ViewType>('month');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(date);
    switch (viewType) {
      case 'month':
        newDate.setMonth(date.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(date.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'day':
        newDate.setDate(date.getDate() + (direction === 'next' ? 1 : -1));
        break;
    }
    setDate(newDate);
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

  const WeekView = () => {
    const weekStart = startOfWeek(date);
    const weekEnd = endOfWeek(date);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div
              key={day.toString()}
              className={`text-center p-2 rounded-lg ${
                isSameDay(day, new Date()) ? 'bg-primary/10' : ''
              }`}
            >
              <div className="font-medium">{format(day, 'EEE')}</div>
              <div className="text-sm">{format(day, 'd')}</div>
            </div>
          ))}
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {events
              .filter((event) =>
                days.some((day) => isSameDay(day, event.date))
              )
              .map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-3 rounded-lg bg-secondary/10 space-y-1"
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
                  <div className="text-xs text-muted-foreground">
                    {format(event.date, 'MMM d')}
                  </div>
                </motion.div>
              ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const DayView = () => {
    const dayEvents = events.filter((event) =>
      isSameDay(event.date, date)
    );

    return (
      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <h3 className="font-medium">{format(date, 'EEEE')}</h3>
            <div className="text-2xl font-bold">{format(date, 'd')}</div>
            <div className="text-sm text-muted-foreground">
              {format(date, 'MMMM yyyy')}
            </div>
          </div>
          <div className="space-y-2">
            {dayEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg bg-secondary/10 space-y-2"
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
          </div>
        </div>
      </ScrollArea>
    );
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
          <div className="flex items-center space-x-4">
            <Tabs value={viewType} onValueChange={(v) => setViewType(v as ViewType)}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {viewType === 'month' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border w-full"
                />
                <div className="space-y-4">
                  <h3 className="font-medium">
                    Events for {format(date, 'MMMM d, yyyy')}
                  </h3>
                  <ScrollArea className="h-[400px]">
                    <AnimatePresence>
                      {events
                        .filter((event) =>
                          isSameDay(event.date, date)
                        )
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
              </div>
            )}
            {viewType === 'week' && <WeekView />}
            {viewType === 'day' && <DayView />}
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}