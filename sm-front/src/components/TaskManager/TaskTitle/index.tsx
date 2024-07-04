import { Task } from '@/utils/types';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, TextField, Typography } from '@mui/material';

interface TaskTitleProps {
  task?: Partial<Task>;
  isEditing: boolean;
  setEditTask: (task: Partial<Task>) => void;
  handleEditToggle: () => void;
}

const TaskTitle: React.FC<TaskTitleProps> = ({
  task,
  isEditing,
  setEditTask,
  handleEditToggle,
}) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
    {isEditing ? (
      <TextField
        label="Title"
        value={task?.title || ''}
        onChange={(e) => setEditTask({ ...task, title: e.target.value })}
        fullWidth
        variant="outlined"
      />
    ) : (
      <Typography variant="h5" fontWeight="600">
        {task?.title}
      </Typography>
    )}
    {!isEditing && (
      <IconButton onClick={handleEditToggle}>
        <EditIcon />
      </IconButton>
    )}
  </Box>
);

export default TaskTitle;
