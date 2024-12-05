import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  startTime?: string;
  endTime?: string;
}

interface TaskState {
  tasks: Task[];
  toggleTask: (id: number) => void;
  addTask: (taskData: { title: string; startTime?: string; endTime?: string }) => void;
  removeTask: (id: number) => void;
}

export const useTasks = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        { id: 1, title: 'Morning Exercise', completed: false, startTime: '06:00', endTime: '07:00' },
        { id: 2, title: 'Team Meeting', completed: true, startTime: '10:00', endTime: '11:00' },
        { id: 3, title: 'Health Check-up', completed: false, startTime: '14:00', endTime: '15:00' },
        { id: 4, title: 'Evening Walk', completed: false, startTime: '18:00', endTime: '18:30' },
      ],
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      addTask: ({ title, startTime, endTime }) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Math.max(0, ...state.tasks.map((t) => t.id)) + 1,
              title,
              completed: false,
              startTime,
              endTime,
            },
          ],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: 'tasks-storage',
    }
  )
);