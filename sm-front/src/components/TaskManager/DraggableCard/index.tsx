import { paths } from '@/store/paths';
import { Task } from '@/utils/types';
import { Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { commonColors } from '../../../../tailwind.config';

interface DraggableCardProps {
  item: Task;
  columnId: string;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    item: Task,
    columnId: string
  ) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  item,
  columnId,
  handleDragStart,
}) => {
  const router = useRouter();
  return (
    <Card
      key={item.taskid}
      draggable
      onDragStart={(e) => handleDragStart(e, item, columnId)}
      onClick={() => router.push(`${paths.task}/${item.taskid}`)}
      className="user-select-none m-0 mb-2"
      sx={{ backgroundColor: commonColors.blue[200] }}
    >
      <CardContent>
        <Typography fontWeight="600">{item.title}</Typography>
        <Typography>{item.description}</Typography>
        <Typography>{item.assignedtoUsername}</Typography>
        <Typography>{new Date(item.createdat).toLocaleDateString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default DraggableCard;
