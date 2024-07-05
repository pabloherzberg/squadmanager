import { LoadingScreen } from '@/components/Loading';
import SquadCard from '@/components/SquadCard';
import TaskDialog from '@/components/TaskDialog';
import TasksManager from '@/components/TaskManager';
import { useGetSquad } from '@/hooks/squad';
import PrivateRoute from '@/providers/PrivateRoute';
import { useAppSelector } from '@/store/useRedux';
import { EmployeeInterface, SquadMember, UserRoleEnum } from '@/utils/types';
import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const SquadForm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const authSelector = useAppSelector((state) => state.auth);
  const squadSelector = useAppSelector((state) => state.squad);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { status } = useGetSquad(String(id));

  if (!squadSelector.squad) {
    return <LoadingScreen />;
  }

  return (
    <Box className="p-4">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h3">Squad Details</Typography>
        {authSelector.user?.role === UserRoleEnum.manager && (
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
      <Grid item xs={12} paddingBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Criar Nova Task
        </Button>
        <TaskDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          squadId={Number(id)}
          assignedTo={authSelector.user?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <TasksManager />
      </Grid>
    </Box>
  );
};

export default PrivateRoute(SquadForm);
