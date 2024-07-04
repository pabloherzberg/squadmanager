import { useAddTaskEvidence, useFetchTaskEvidence } from '@/hooks/tasks';
import { useAppSelector } from '@/store/useRedux';
import { TaskStatusEnum } from '@/utils/types';

import { useToast } from '@/providers/ToastProvider';
import Logo from '@/styles/assets/images/logo.svg';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { commonColors } from '../../../../tailwind.config';

interface TaskEvidenceProps {
  taskId: number;
}

const TaskEvidence: React.FC<TaskEvidenceProps> = ({ taskId }) => {
  const taskEvidence = useAppSelector((state) => state.task.evidence);
  const [inputValues, setInputValue] = useState({
    evidencePath: '',
    description: '',
    status: false,
  });

  useFetchTaskEvidence(taskId);
  const { mutateAsync: addEvidence } = useAddTaskEvidence();
  const toast = useToast();

  const handleAddEvidence = () => {
    if (!inputValues.description) {
      toast.error({ content: 'Descrição é obrigatória!' });
    }
    if (taskId && inputValues.description) {
      addEvidence({
        taskId,
        evidence: {
          evidencepath: inputValues.evidencePath,
          description: inputValues.description,
          status: inputValues.status ? TaskStatusEnum.blocked : '',
        },
      }).finally(() => {
        toast.success({ content: 'Comentário enviado com sucesso!' });
      });
      setInputValue({
        evidencePath: '',
        description: '',
        status: false,
      });
    }
  };

  return (
    <Box className="flex flex-col">
      <Typography variant="h6">Inserir comentário</Typography>
      <TextField
        label="Caminho da evidência"
        value={inputValues.evidencePath}
        onChange={(e) =>
          setInputValue({ ...inputValues, evidencePath: e.target.value })
        }
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        margin="normal"
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        label="Descrição"
        value={inputValues.description}
        onChange={(e) =>
          setInputValue({ ...inputValues, description: e.target.value })
        }
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        margin="normal"
        sx={{ backgroundColor: '#fff' }}
      />
      <FormControlLabel
        label="Blocked"
        control={
          <Checkbox
            sx={{
              color: commonColors.blue.DEFAULT,
              backgroundColor: commonColors.white.DEFAULT,
            }}
            checked={inputValues.status}
            onChange={(e) =>
              setInputValue({ ...inputValues, status: e.target.checked })
            }
          />
        }
      />
      <Button
        sx={{ alignSelf: 'flex-end' }}
        variant="contained"
        color="primary"
        onClick={handleAddEvidence}
      >
        Enviar comentário
      </Button>
      {taskEvidence.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Evidências</Typography>
          {taskEvidence.map((evidence) => (
            <Card key={evidence.evidenceid} sx={{ mb: 2 }}>
              <CardContent>
                <Image
                  width={200}
                  height={200}
                  alt="Evidência"
                  src={evidence.evidencepath || Logo}
                />
                {evidence.description && (
                  <Typography variant="body2" color="textSecondary">
                    {evidence.description}
                  </Typography>
                )}
                {evidence.status && (
                  <Typography variant="body2" color="textSecondary">
                    Status: {evidence.status}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  Upload: {new Date(evidence.uploadedat).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TaskEvidence;
