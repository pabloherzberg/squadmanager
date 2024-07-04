import { CustomTable } from '@/components/Table';
import {
  useAddSquadMember,
  useDeleteSquadMember,
  useFetchUsers,
  useGetSquad,
  useUpdateSquad,
} from '@/hooks/squad';
import { useToast } from '@/providers/ToastProvider';
import { useAppSelector } from '@/store/useRedux';
import { EmployeeInterface, UserRoleEnum } from '@/utils/types';
import { Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { commonColors } from '../../../../../../../tailwind.config';

const NewSquadForm: React.FC = () => {
  const squadSelector = useAppSelector((state) => state.squad);
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const users = useAppSelector((state) => state.auth.users);
  const [inputValues, setInputValues] = useState({
    name: squadSelector.squad.name,
    description: squadSelector.squad.description,
  });
  const { mutate: update, status: updateStatus } = useUpdateSquad();
  const { mutate: deleteSquadMember, status: deleteStatus } =
    useDeleteSquadMember();
  const { refetch: refetchSquad } = useGetSquad(squadSelector.squad.squadid);
  const { status: usersStatus } = useFetchUsers();
  const { mutate: addSquadMember, status: addMemberStatus } =
    useAddSquadMember();
  const [selectedUser, setSelectedUser] = useState<EmployeeInterface | null>(
    null
  );
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update(
      {
        squadid: squadSelector.squad.squadid,
        name: inputValues.name,
        description: inputValues.description,
        createdat: squadSelector.squad.createdat,
        createdby: squadSelector.squad.createdby,
      },
      {
        onSuccess: () => {
          toast.success({ content: 'Alterado com sucesso' });
          refetchSquad();
        },
      }
    );
    refetchSquad();
  };

  const handleRemoveMember = (memberId: number) => {
    deleteSquadMember(
      { squadId: squadSelector.squad.squadid, memberId },
      {
        onSuccess: () => {
          toast.success({ content: 'Membro removido com sucesso' });
          refetchSquad();
        },
      }
    );
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      addSquadMember(
        { squadId: squadSelector.squad.squadid, userId: selectedUser.userid },
        {
          onSuccess: () => {
            toast.success({ content: 'Membro adicionado com sucesso' });
            refetchSquad();
          },
        }
      );
    }
  };

  const columns: any = [
    {
      key: 'remove',
      label: 'Ação',
      render: (row: EmployeeInterface) => (
        <IconButton
          aria-label="delete"
          onClick={() => handleRemoveMember(row.userid)}
        >
          <Delete />
        </IconButton>
      ),
    },
    {
      key: 'userid',
      label: 'ID',
      render: (row: EmployeeInterface) => row.userid,
    },
    {
      key: 'username',
      label: 'Nome',
      render: (row: EmployeeInterface) => row.username,
    },
    {
      key: 'email',
      label: 'Email',
      render: (row: EmployeeInterface) => row.email,
    },
    {
      key: 'role',
      label: 'Role',
      render: (row: EmployeeInterface) => row.role,
    },
  ];

  const data = squadSelector.squadMembers.map((member: any) => {
    const user = squadSelector.users.find(
      (u: any) => u.userid === member.userid
    );
    return {
      userid: member.squadmemberid,
      username: user?.username,
      email: user?.email,
      role: member.role,
    };
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Editar Squad
        </Typography>
        <TextField
          label="Nome da Squad"
          fullWidth
          margin="normal"
          value={inputValues.name}
          onChange={(e) =>
            setInputValues({ ...inputValues, name: e.target.value })
          }
        />
        <TextField
          label="Descrição"
          fullWidth
          margin="normal"
          value={inputValues.description}
          onChange={(e) =>
            setInputValues({ ...inputValues, description: e.target.value })
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={`mt-4 bg-${commonColors.blue[200]}`}
          disabled={updateStatus === 'loading'}
        >
          {updateStatus === 'loading'
            ? 'Alterando...'
            : 'Alterar nome e descrição'}
        </Button>
      </form>

      <Typography variant="h6" gutterBottom className="mt-6">
        Squad Members
      </Typography>
      {userRole === UserRoleEnum.manager && (
        <div className="mt-6">
          <form onSubmit={handleAddMember}>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => option.username}
              onChange={(event, newValue) => setSelectedUser(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nome do Membro"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={addMemberStatus === 'loading'}
            >
              {addMemberStatus === 'loading'
                ? 'Adicionando...'
                : 'Adicionar Membro'}
            </Button>
          </form>
        </div>
      )}
      <CustomTable
        data={data}
        columns={columns}
        loading={updateStatus === 'loading'}
        withoutDataComponent={<div>Nenhum membro encontrado</div>}
      />
    </Container>
  );
};

export default NewSquadForm;
