import { useAppSelector } from '@/store/useRedux';
import { Squad, UserRoleEnum } from '@/utils/types';
import { Card, CardContent, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { commonColors } from '../../../tailwind.config';
import { SmallText } from '../Typography';

interface SquadCardProps {
  squad: Squad;
}

const SquadCard: React.FC<SquadCardProps> = ({ squad }) => {
  const user = useAppSelector((state) => state.auth.user);
  const createdAt = new Date(squad.createdat).toLocaleDateString();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Card
      onClick={() =>
        router.push(
          user?.role === UserRoleEnum.manager
            ? `/manager/squads/${squad.squadid}/edit/form`
            : `/employee/squads/${squad.squadid}/`
        )
      }
      className={`bg-gray-50 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:bg-blue-200 hover:shadow-2xl transition duration-200`}
    >
      <CardContent>
        <Typography
          sx={{ color: commonColors?.black }}
          variant="h5"
          component="div"
          className="mb-2 flex justify-between items-center"
        >
          {squad.name}
        </Typography>

        <SmallText className="text-black">{createdAt}</SmallText>
        <Typography sx={{ color: commonColors?.black }} variant="body2">
          {squad.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SquadCard;
