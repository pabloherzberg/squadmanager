import PrivateRoute from '@/components/PrivateRoute';
import { useAppSelector } from '@/store/hooks';

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <p>Are you {user?.role}?</p>
    </div>
  );
};

export default PrivateRoute(Home);
