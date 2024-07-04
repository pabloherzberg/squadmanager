import { Task } from '@/utils/types';
import { Typography } from '@mui/material';

interface TaskMetadataProps {
  task?: Partial<Task>;
}

const TaskMetadata: React.FC<TaskMetadataProps> = ({ task }) => (
  <Typography mb={2}>
    Created at: {new Date(task?.createdat || '').toLocaleDateString()}
  </Typography>
);

export default TaskMetadata;
