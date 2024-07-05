import { useCreateTask } from '@/hooks/tasks';
import { useToast } from '@/providers/ToastProvider';
import { TaskStatusEnum } from '@/utils/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  squadId: number;
  assignedTo: number | undefined;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, squadId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duedate, setDuedate] = useState('');
  const [status, setStatus] = useState<TaskStatusEnum>(TaskStatusEnum.todo);
  const { mutateAsync: createTask } = useCreateTask();
  const toast = useToast();

  const handleCreateTask = () => {
    createTask(
      { title, description, duedate, squadid: squadId, status },
      {
        onSuccess: () => {
          toast.success({
            content: 'Task criada com sucesso',
          });
        },
      }
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Nova Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Título"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descrição"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Data de Vencimento"
          type="date"
          fullWidth
          value={duedate}
          onChange={(e) => setDuedate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          label="Status"
          select
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatusEnum)}
        >
          <MenuItem value={TaskStatusEnum.todo}>A Fazer</MenuItem>
          <MenuItem value={TaskStatusEnum.doing}>Em Progresso</MenuItem>
          <MenuItem value={TaskStatusEnum.done}>Concluído</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleCreateTask} color="primary">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
