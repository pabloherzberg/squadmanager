import { useGetSquad, useUpdateSquad } from '@/hooks/squad';
import { useToast } from '@/providers/ToastProvider';
import { useAppSelector } from '@/store/useRedux';
import React from 'react';
import SquadFormBase from '../SquadFormBase';

const SquadForm: React.FC = () => {
  const squadSelector = useAppSelector((state) => state.squad);
  const { mutate: update, status: updateStatus } = useUpdateSquad();
  const { refetch: refetchSquad } = useGetSquad(squadSelector.squad.squadid);
  const toast = useToast();

  const handleSubmit = (values: { name: string; description: string }) => {
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
    update(
      {
        squadid: squadSelector.squad.squadid,
        name: values.name,
        description: values.description,
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

  return (
    <SquadFormBase
      initialValues={{
        name: squadSelector.squad.name,
        description: squadSelector.squad.description,
      }}
      onSubmit={handleSubmit}
      isLoading={updateStatus === 'loading'}
      title="Editar Squad"
      buttonText="Alterar nome e descrição"
    />
  );
};

export default SquadForm;
