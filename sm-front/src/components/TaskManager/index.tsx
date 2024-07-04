import { useFetchTasks, useUpdateTask } from '@/hooks/tasks';
import useColumns from '@/hooks/tasks/useColumns';
import { useAppSelector } from '@/store/useRedux';
import { QueryStatusEnum, Task } from '@/utils/types';
import { Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import React from 'react';
import { LoadingScreen } from '../Loading';
import Column from './Column';

const TasksManager: React.FC = () => {
  const { status } = useFetchTasks();
  const { id } = useParams();
  const tasksSelector = useAppSelector((state) => state.task);
  const filteredTasks = tasksSelector.tasks.filter(
    (task) => task.squadid === Number(id)
  );

  const [columns, setColumns] = useColumns(filteredTasks);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: Task,
    sourceCol: string
  ) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
    e.dataTransfer.setData('sourceCol', sourceCol);
  };

  const { mutateAsync } = useUpdateTask();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, destCol: string) => {
    const item = JSON.parse(e.dataTransfer.getData('item')) as Task;
    const sourceCol = e.dataTransfer.getData('sourceCol');
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

      const dueDate = new Date().toLocaleDateString();

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
    <Grid container spacing={2}>
      {Object.entries(columns).map(([columnId, column]) => (
        <Grid item xs={12} sm={6} md={4} key={columnId}>
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
