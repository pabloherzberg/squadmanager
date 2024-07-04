import { useAddSquadMember, useFetchUsers, useGetSquad } from '@/hooks/squad';
import { useToast } from '@/providers/ToastProvider';
import { useAppSelector } from '@/store/useRedux';
import { UserRoleEnum } from '@/utils/types';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const AddMemberForm: React.FC = () => {
  const { status: usersStatus } = useFetchUsers();
  const users = useAppSelector((state) => state.auth.users);
  const squadSelector = useAppSelector((state) => state.squad);
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    userId: number;
  }>({ name: '', userId: 0 });
  const { refetch } = useGetSquad(squadSelector.squad.squadid);
  const { mutate: addSquadMember, status } = useAddSquadMember();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSquadMember(
      { squadId: squadSelector.squad.squadid, userId: selectedUser.userId },
      {
        onSuccess: () => {
          toast.success({ content: 'Membro adicionado com sucesso' });
          refetch();
        },
      }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Adicionar Membro
      </Typography>
      <Autocomplete
        options={users.filter((user) => user.role !== UserRoleEnum.manager)}
        getOptionLabel={(option) => option.username}
        onChange={(event, newValue) => {
          if (newValue) {
            setSelectedUser({
              name: newValue.username,
              userId: newValue.userid,
            });
          } else {
            setSelectedUser({ name: '', userId: 0 });
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nome do Membro"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={status === 'loading' || !selectedUser.userId}
      >
        {status === 'loading' ? 'Adicionando...' : 'Adicionar Membro'}
      </Button>
    </Box>
  );
};

export default AddMemberForm;
