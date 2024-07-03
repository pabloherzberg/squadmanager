import { LoadingScreen } from '@/components/Loading';
import SquadCard from '@/components/SquadCard';
import { useGetSquad } from '@/hooks/squad';
import PrivateRoute from '@/providers/PrivateRoute';
import { useAppSelector } from '@/store/useRedux';
import { EmployeeInterface, SquadMember } from '@/utils/types';
import { Edit } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const SquadForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const squadSelector = useAppSelector((state) => state.squad);
  const userRole = useAppSelector((state) => state.auth.user?.role);

  if (id) {
    useGetSquad(String(id));
  }
  if (!squadSelector.squad) {
    return <LoadingScreen />;
  }

  return (
    <Box className="p-4">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h3">Squad Details</Typography>
        {userRole === 'Gerente' && (
          <IconButton
            aria-label="edit squad"
            onClick={() => router.push(`/manager/squads/${id}/edit/form`)}
          >
            <Edit />
          </IconButton>
        )}
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SquadCard squad={squadSelector.squad} />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Card className="hover:shadow-lg transition duration-200">
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h5" component="div">
                  Squad Members
                </Typography>
              </Box>
              <List>
                {squadSelector.squadMembers.map((member: SquadMember) => {
                  const user = squadSelector.users.find(
                    (u: EmployeeInterface) => u.userid === member.userid
                  );
                  return (
                    <ListItem key={member.squadmemberid} className="mb-2">
                      <ListItemText
                        primary={`${user?.username} (${member.role})`}
                        secondary={`Email: ${user?.email}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrivateRoute(SquadForm);
