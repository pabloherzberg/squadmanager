import { CustomTable } from '@/components/Table';
import { useDeleteSquadMember, useGetSquad } from '@/hooks/squad';
import { useToast } from '@/providers/ToastProvider';
import { useAppSelector } from '@/store/useRedux';
import { EmployeeInterface } from '@/utils/types';
import { Delete } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

const SquadMemberList: React.FC = () => {
  const squadSelector = useAppSelector((state) => state.squad);
  const { mutate: deleteSquadMember, status: deleteStatus } =
    useDeleteSquadMember();
  const { refetch: refetchSquad } = useGetSquad(squadSelector.squad.squadid);
  const toast = useToast();

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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Squad Members
      </Typography>
      <CustomTable
        data={data}
        columns={columns}
        loading={deleteStatus === 'loading'}
        withoutDataComponent={<div>Nenhum membro encontrado</div>}
      />
    </Box>
  );
};

export default SquadMemberList;
