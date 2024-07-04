import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { commonColors } from '../../../tailwind.config';

interface SquadFormBaseProps {
  initialValues: { name: string; description: string };
  onSubmit: (values: { name: string; description: string }) => void;
  isLoading: boolean;
  title: string;
  buttonText: string;
}

const SquadFormBase: React.FC<SquadFormBaseProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  title,
  buttonText,
}) => {
  const [inputValues, setInputValues] = useState(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        {title}
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
        disabled={isLoading}
      >
        {isLoading ? 'Processando...' : buttonText}
      </Button>
    </form>
  );
};

export default SquadFormBase;
