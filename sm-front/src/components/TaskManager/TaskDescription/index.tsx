import { Task } from '@/utils/types';
import { Box, TextField, Typography } from '@mui/material';

interface TaskDescriptionProps {
  task?: Partial<Task>;
  isEditing: boolean;
  setEditTask: (task: Partial<Task>) => void;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({
  task,
  isEditing,
  setEditTask,
}) => (
  <Box display="flex" alignItems="center" mb={2}>
    {isEditing ? (
      <TextField
        label="Description"
        value={task?.description || ''}
        onChange={(e) => setEditTask({ ...task, description: e.target.value })}
        fullWidth
        variant="outlined"
      />
    ) : (
      <Typography>{task?.description}</Typography>
    )}
  </Box>
);

export default TaskDescription;
