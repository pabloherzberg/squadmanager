import { Task, User } from '@/utils/types';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';

interface TaskAssigneeProps {
  task?: Partial<Task>;
  isEditing: boolean;
  setEditTask: (task: Partial<Task>) => void;
  users: User[];
}

const TaskAssignee: React.FC<TaskAssigneeProps> = ({
  task,
  isEditing,
  setEditTask,
  users,
}) => {
  const handleUserChange = (event: any, newValue: any) => {
    const userId = newValue?.userid;
    setEditTask({
      ...task,
      assignedto: userId,
      assignedtoUsername: newValue?.username || '',
    });
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      {isEditing ? (
        <Autocomplete
          className="w-full"
          options={users}
          getOptionLabel={(option) => option.username}
          onChange={handleUserChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Assigned to"
              fullWidth
              variant="outlined"
            />
          )}
          value={users.find((user) => user.userid === task?.assignedto) || null}
        />
      ) : (
        <Typography>Assigned to: {task?.assignedtoUsername}</Typography>
      )}
    </Box>
  );
};

export default TaskAssignee;
