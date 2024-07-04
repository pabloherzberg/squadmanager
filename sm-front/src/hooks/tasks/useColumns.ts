import { Task, TaskStatusEnum } from '@/utils/types';
import { useEffect, useState } from 'react';

interface Column {
  name: string;
  items: Task[];
}

export interface Columns {
  [key: string]: Column;
}

const useColumns = (initialTasks: Task[]) => {
  const createInitialColumns = (tasks: Task[]): Columns => {
    return {
      todo: {
        name: TaskStatusEnum.todo,
        items: tasks.filter((task) => task.status === TaskStatusEnum.todo),
      },
      doing: {
        name: TaskStatusEnum.doing,
        items: tasks.filter((task) => task.status === TaskStatusEnum.doing),
      },
      done: {
        name: TaskStatusEnum.done,
        items: tasks.filter((task) => task.status === TaskStatusEnum.done),
      },
    };
  };

  const [columns, setColumns] = useState<Columns>(
    createInitialColumns(initialTasks)
  );

  useEffect(() => {
    setColumns(createInitialColumns(initialTasks));
  }, [initialTasks]);

  return [columns, setColumns] as const;
};

export default useColumns;
