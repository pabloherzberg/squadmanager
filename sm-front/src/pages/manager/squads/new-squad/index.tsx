import { useCreateSquad } from '@/hooks/squad';
import { useToast } from '@/providers/ToastProvider';
import { paths } from '@/store/paths';
import { QueryStatusEnum } from '@/utils/types';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { commonColors } from '../../../../../tailwind.config';

const NewSquadForm: React.FC = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
  });
  const { mutateAsync: createSquad, status } = useCreateSquad();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValues.name || !inputValues.description) {
      toast.error({ content: 'Preencha todos os campos' });
      return;
    }
    if (inputValues.description.trim().length < 10) {
      toast.error({
        content:
          'Descrição deve ter no mínimo 10 caracteres. Tente criar uma descrição mais detalhada',
      });
      return;
    }
    createSquad(
      { name: inputValues.name, description: inputValues.description },
      {
        onSuccess: () => {
          toast.success({ content: 'Squad criada com sucesso' });
        },
      }
    ).finally(() => {
      router.push(paths.squads);
    });
  };

  const disableButton =
    !inputValues.name ||
    !inputValues.description ||
    status === QueryStatusEnum.loading;

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Criar Nova Squad
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
          disabled={disableButton}
        >
          {status === 'loading' ? 'Criando...' : 'Criar Squad'}
        </Button>
      </form>
    </Container>
  );
};

export default NewSquadForm;
