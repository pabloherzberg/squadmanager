import { useAppSelector } from '@/store/useRedux';
import { Squad } from '@/utils/types';
import { Card, CardContent, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { commonColors } from '../../../tailwind.config';
import { SmallText } from '../Typography';

interface SquadCardProps {
  squad: Squad;
}

const SquadCard: React.FC<SquadCardProps> = ({ squad }) => {
  const createdAt = new Date(squad.createdat).toLocaleDateString();
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Card
      onClick={() =>
        router.push(
          pathname.includes('edit')
            ? `/manager/squads/${squad.squadid}/edit/form`
            : `/manager/squads/${squad.squadid}/edit`
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
