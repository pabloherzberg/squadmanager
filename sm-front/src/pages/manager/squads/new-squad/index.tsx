import SquadFormBase from '@/components/SquadFormBase';
import { useCreateSquad } from '@/hooks/squad';
import PrivateRoute from '@/providers/PrivateRoute';
import { useToast } from '@/providers/ToastProvider';
import { paths } from '@/store/paths';
import { QueryStatusEnum } from '@/utils/types';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const NewSquadForm: React.FC = () => {
  const { mutateAsync: createSquad, status } = useCreateSquad();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    if (!values.name || !values.description) {
      toast.error({ content: 'Preencha todos os campos' });
      return;
    }
    if (values.description.trim().length < 10) {
      toast.error({
        content:
          'Descrição deve ter no mínimo 10 caracteres. Tente criar uma descrição mais detalhada',
      });
      return;
    }
    try {
      await createSquad({ name: values.name, description: values.description });
      toast.success({ content: 'Squad criada com sucesso' });
      router.push(paths.squads);
    } catch (error) {
      toast.error({ content: 'Erro ao criar squad' });
    }
  };

  return (
    <Container maxWidth="sm">
      <SquadFormBase
        initialValues={{ name: '', description: '' }}
        onSubmit={handleSubmit}
        isLoading={status === QueryStatusEnum.loading}
        title="Criar Nova Squad"
        buttonText="Criar Squad"
      />
    </Container>
  );
};

export default PrivateRoute(NewSquadForm);
