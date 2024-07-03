import { useCreateSquad } from '@/hooks/squad';
import { paths } from '@/store/paths';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { commonColors } from '../../../../../tailwind.config';

const NewSquadForm: React.FC = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
  });
  const { mutate: createSquad, status } = useCreateSquad();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSquad(
      { name: inputValues.name, description: inputValues.description },
      {
        onSuccess: () => {
          router.push(paths.manager);
        },
      }
    );
  };

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
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Criando...' : 'Criar Squad'}
        </Button>
      </form>
    </Container>
  );
};

export default NewSquadForm;
