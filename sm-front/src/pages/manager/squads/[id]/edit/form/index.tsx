import AddMemberForm from '@/components/AddMemberForm';
import DeleteActionButton from '@/components/DeleteActionButton';
import SquadForm from '@/components/SquadForm';
import SquadMemberList from '@/components/SquadMemeberList';
import PrivateRoute from '@/providers/PrivateRoute';
import { Container, Grid } from '@mui/material';
import React from 'react';

const EditSquadForm: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SquadForm />
        </Grid>
        <Grid item xs={12}>
          <SquadMemberList />
        </Grid>
        <Grid item xs={12}>
          <AddMemberForm />
        </Grid>
        <Grid item xs={12}>
          <DeleteActionButton />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrivateRoute(EditSquadForm);
