import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  toggleTask: (id: number) => void;
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
}

export const useTasks = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        { id: 1, title: 'Morning Exercise', completed: false },
        { id: 2, title: 'Team Meeting', completed: true },
        { id: 3, title: 'Health Check-up', completed: false },
        { id: 4, title: 'Evening Walk', completed: false },
      ],
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Math.max(0, ...state.tasks.map((t) => t.id)) + 1,
              title,
              completed: false,
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