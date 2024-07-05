import { useFetchTasks, useUpdateTask } from '@/hooks/tasks';
import { useAppSelector } from '@/store/useRedux';
import { QueryStatusEnum, Task, TaskStatusEnum } from '@/utils/types';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '../Loading';
import Column from './Column';

interface Column {
  name: TaskStatusEnum;
  items: Task[];
}

interface Columns {
  todo: Column;
  doing: Column;
  done: Column;
}

const TasksManager: React.FC = () => {
  const { status } = useFetchTasks();
  const router = useRouter();
  const { id } = router.query;

  const tasksSelector = useAppSelector((state) => state.task);

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

  const [columns, setColumns] = useState<Columns>(() =>
    createInitialColumns([])
  );

  useEffect(() => {
    if (id && tasksSelector.tasks.length > 0) {
      const filteredTasks = tasksSelector.tasks.filter(
        (task: Task) => task.squadid === Number(id)
      );
      console.log(filteredTasks);
      setColumns(createInitialColumns(filteredTasks));
    }
  }, [id, tasksSelector.tasks]);

  console.log(columns);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: Task,
    sourceCol: keyof Columns
  ) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
    e.dataTransfer.setData('sourceCol', sourceCol);
  };

  const { mutateAsync } = useUpdateTask();

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    destCol: keyof Columns
  ) => {
    const item = JSON.parse(e.dataTransfer.getData('item')) as Task;
    const sourceCol = e.dataTransfer.getData('sourceCol') as keyof Columns;
    if (sourceCol !== destCol) {
      const sourceItems = columns[sourceCol].items.filter(
        (i) => i.taskid !== item.taskid
      );
      const destItems = [
        ...columns[destCol].items,
        { ...item, status: destCol },
      ];

      setColumns({
        ...columns,
        [sourceCol]: { ...columns[sourceCol], items: sourceItems },
        [destCol]: { ...columns[destCol], items: destItems },
      });

      mutateAsync({
        id: item.taskid,
        data: { status: destCol },
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (status === QueryStatusEnum.loading) {
    return <LoadingScreen />;
  }

  return (
    <Grid container spacing={4}>
      {Object.entries(columns).map(([columnId, column]) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={columnId}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Column
            columnId={columnId}
            column={column}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TasksManager;
