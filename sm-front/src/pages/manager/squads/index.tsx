'use client';
import { LoadingScreen } from '@/components/Loading';
import SquadCard from '@/components/SquadCard';
import { useFetchSquads } from '@/hooks/squad/index';
import PrivateRoute from '@/providers/PrivateRoute';
import { paths } from '@/store/paths';
import { useAppSelector } from '@/store/useRedux';
import { Alert, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { commonColors } from '../../../../tailwind.config';

const Form = () => {
  const { status } = useFetchSquads();
  const squads = useAppSelector((state) => state.squad.squads);
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (!auth.token) {
    return <LoadingScreen />;
  }

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'error') {
    return <div>Failed to load squads</div>;
  }

  const handleNewSquadClick = () => {
    router.push(paths.squadsNewSquad);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6">Squads</h1>
      <Grid container spacing={4}>
        {!squads.length && (
          <Alert severity="info" className="w-full mt-10">
            Você ainda não criou nenhuma Squad.
          </Alert>
        )}
        {squads.map((squad: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={squad.squadid}>
            <SquadCard squad={squad} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button
            onClick={handleNewSquadClick}
            className={`h-full w-full bg-gray-50 shadow-lg rounded-lg overflow-hidden cursor-pointer flex justify-center items-center h-full hover:${commonColors.blue[200]} hover:shadow-2xl transition duration-200`}
          >
            <Typography>Criar nova Squad</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PrivateRoute(Form);
