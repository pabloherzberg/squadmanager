import TasksManager from '@/components/TaskManager';
import PrivateRoute from '@/providers/PrivateRoute';
import { Grid } from '@mui/material';
import { FC } from 'react';

const EmployeeSpace: FC = () => {
  return (
    <Grid container spacing={2}>
      <TasksManager />
    </Grid>
  );
};

export default PrivateRoute(EmployeeSpace);
