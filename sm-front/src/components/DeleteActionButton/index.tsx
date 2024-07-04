import { useDeleteSquad } from '@/hooks/squad';
import { useToast } from '@/providers/ToastProvider';
import { paths } from '@/store/paths';
import { useAppSelector } from '@/store/useRedux';
import { Squad } from '@/utils/types';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const DeleteActionButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteSquad, status: deleteStatus } = useDeleteSquad();
  const squadSelector: Squad = useAppSelector((state) => state.squad.squad);
  const toast = useToast();
  const router = useRouter();

  const handleDelete = () => {
    deleteSquad(squadSelector, {
      onSuccess: () => {
        toast.success({ content: 'Squad deletada com sucesso' });
        router.push(paths.squads);
      },
      onError: () => {
        toast.error({ content: 'Erro ao deletar squad' });
      },
    });
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        startIcon={<DeleteIcon />}
        style={{ float: 'right' }}
        disabled={deleteStatus === 'loading'}
      >
        {deleteStatus === 'loading' ? 'Deletando...' : 'Deletar'}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmação de Deleção</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar esta squad? Esta ação não pode ser
            desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteActionButton;
