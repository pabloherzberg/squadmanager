import { useFetchUsers } from '@/hooks/squad';
import { useFetchTasks } from '@/hooks/tasks';
import { useAppSelector } from '@/store/useRedux';
import { Squad, Task, User, UserRoleEnum } from '@/utils/types';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomTable } from '../Table';

const TaskList: React.FC = () => {
  const { status: fetchStatus } = useFetchTasks();
  const { status: fetchUsersStatus } = useFetchUsers();
  const authSelector = useAppSelector((state) => state.auth);
  const users: User[] = useAppSelector((state) => state.auth.users);
  const squad: Squad = useAppSelector((state) => state.squad.squad);
  const tasks: Task[] = useAppSelector((state) => state.task.tasks);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const filterTasks = () => {
      const filtered = tasks
        .filter((task: Task) => {
          if (authSelector.user?.role === UserRoleEnum.employee) {
            return task.assignedto === authSelector.user?.id;
          } else if (selectedUser) {
            return (
              task.assignedto === selectedUser.userid &&
              task.squadid === squad.squadid
            );
          }
          return task.squadid === squad.squadid;
        })
        .map((task: Task) => {
          return {
            ...task,
            squadName: squad ? squad.name : 'N/A',
            assignedtoName: users.find(
              (user) => user.userid === task.assignedto
            )?.username,
          };
        });
      setFilteredTasks(filtered);
    };

    filterTasks();
  }, [tasks, selectedUser, squad, authSelector.user, users]);

  const columns: any = [
    {
      key: 'taskid',
      label: 'Task ID',
      render: (row: Task) => row.taskid,
    },
    {
      key: 'assignedto',
      label: 'Atribuído a',
      render: (row: any) => row.assignedtoName,
    },
    {
      key: 'squadName',
      label: 'Nome da Squad',
      render: (row: any) => row.squadName,
    },
    {
      key: 'title',
      label: 'Título',
      render: (row: Task) => row.title,
    },
    {
      key: 'description',
      label: 'Descrição',
      render: (row: Task) => row.description,
    },
    {
      key: 'duedate',
      label: 'Data de Vencimento',
      render: (row: Task) => new Date(row.duedate).toLocaleDateString(),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: Task) => row.status,
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Tarefas
      </Typography>
      {authSelector.user?.role === UserRoleEnum.manager && (
        <Autocomplete
          options={users}
          getOptionLabel={(option) => option.username}
          onChange={(event, newValue) => setSelectedUser(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrar por usuário"
              margin="normal"
              fullWidth
            />
          )}
        />
      )}
      <CustomTable
        data={filteredTasks}
        columns={columns}
        loading={fetchStatus === 'loading' || fetchUsersStatus === 'loading'}
        withoutDataComponent={<div>Nenhuma tarefa encontrada</div>}
      />
    </Box>
  );
};

export default TaskList;
