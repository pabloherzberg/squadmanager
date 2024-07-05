import { LoadingScreen } from '@/components/Loading';
import SquadCard from '@/components/SquadCard';
import { useFetchSquads } from '@/hooks/squad/index';
import PrivateRoute from '@/providers/PrivateRoute';
import { useAppSelector } from '@/store/useRedux';
import { Alert, Grid } from '@mui/material';

const Form = () => {
  const { status } = useFetchSquads();
  const squads = useAppSelector((state) => state.squad.squads);
  const auth = useAppSelector((state) => state.auth);

  if (!auth.token) {
    return <LoadingScreen />;
  }

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'error') {
    return <div>Failed to load squads</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6">Squads</h1>
      <Grid container spacing={4}>
        {!squads.length && (
          <Alert severity="info" className="w-full mt-10">
            Você não faz parte de nenhuma Squad. Verifique com o seu Gerente.
          </Alert>
        )}
        {squads.map((squad: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={squad.squadid}>
            <SquadCard squad={squad} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PrivateRoute(Form);
