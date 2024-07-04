import { Button } from '@/components/Button';
import { LoadingScreen } from '@/components/Loading';
import TaskAssignee from '@/components/TaskManager/TaskAssignee.tsx';
import TaskDescription from '@/components/TaskManager/TaskDescription';
import TaskEvidence from '@/components/TaskManager/TaskEvidence';
import TaskMetadata from '@/components/TaskManager/TaskMetadata';
import TaskTitle from '@/components/TaskManager/TaskTitle';
import { useFetchUsers } from '@/hooks/squad';
import useTaskDetail from '@/hooks/tasks/useTaskDetails';
import PrivateRoute from '@/providers/PrivateRoute';
import { useAppSelector } from '@/store/useRedux';
import { Box, Card, CardContent } from '@mui/material';
import { commonColors } from '../../../../tailwind.config';

const TaskDetailPage = () => {
  const users = useAppSelector((state) => state.auth.users);
  const { status: fetchUserStatus } = useFetchUsers();

  const {
    editTask,
    isEditing,
    setEditTask,
    handleEditToggle,
    handleSaveTask,
    isLoading,
  } = useTaskDetail();

  if (isLoading || fetchUserStatus === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <Box p={4}>
      <Card sx={{ backgroundColor: commonColors.blue[200] }}>
        <CardContent className="flex flex-col">
          <TaskTitle
            task={editTask}
            isEditing={isEditing}
            setEditTask={setEditTask}
            handleEditToggle={handleEditToggle}
          />
          <TaskDescription
            task={editTask}
            isEditing={isEditing}
            setEditTask={setEditTask}
          />
          <TaskAssignee
            task={editTask}
            isEditing={isEditing}
            setEditTask={setEditTask}
            users={users}
          />
          <TaskMetadata task={editTask} />
          {isEditing && (
            <Box
              display="flex"
              justifyContent="flex-end"
              width={'100%'}
              gap={2}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEditToggle}
                className="w-32"
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveTask}
                className="w-32"
              >
                Salvar
              </Button>
            </Box>
          )}
        </CardContent>
        <CardContent className="flex flex-col">
          <TaskEvidence taskId={Number(editTask?.taskid)} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrivateRoute(TaskDetailPage);
