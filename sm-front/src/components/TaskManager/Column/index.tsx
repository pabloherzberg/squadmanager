import DraggableCard from '@/components/TaskManager/DraggableCard';
import { Task } from '@/utils/types';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { commonColors } from '../../../../tailwind.config';

interface ColumnProps {
  columnId: string;
  column: {
    name: string;
    items: Task[];
  };
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    item: any,
    columnId: any
  ) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, destCol: any) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Column: React.FC<ColumnProps> = ({
  columnId,
  column,
  handleDragStart,
  handleDrop,
  handleDragOver,
}) => {
  const handleColumnTitle = (columnName: string): string => {
    switch (columnName) {
      case 'todo':
        return 'A fazer';
      case 'doing':
        return 'Fazendo';
      case 'done':
        return 'Feito';
      default:
        return '';
    }
  };
  return (
    <Paper elevation={3}>
      <Box p={2} bgcolor={commonColors.blue.DEFAULT}>
        <Typography
          color={commonColors.white[200]}
          fontWeight="600"
          variant="h6"
          textTransform={'capitalize' as any}
        >
          {handleColumnTitle(column.name)}
        </Typography>
        <div
          onDrop={(e) => handleDrop(e, columnId)}
          onDragOver={handleDragOver}
          className="p-4 align-center flex flex-col min-h-[400px] gap-2"
          style={{ backgroundColor: commonColors.white[200] }}
        >
          {column.items.map((item) => (
            <DraggableCard
              key={item.taskid}
              item={item}
              columnId={columnId}
              handleDragStart={handleDragStart}
            />
          ))}
        </div>
      </Box>
    </Paper>
  );
};

export default Column;
