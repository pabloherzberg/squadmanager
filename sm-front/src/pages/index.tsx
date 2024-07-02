import PrivateRoute from '@/providers/Routes/PrivateRoute';
import { fetchEmployees } from '@/store/employeeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSquads } from '@/store/squadSlice';
import { EmployeeInterface, Squad } from '@/utils/types/user';
import { useEffect } from 'react';

const Squads = () => {
  const dispatch = useAppDispatch();
  const employees: EmployeeInterface[] = useAppSelector(
    (state) => state.employee.employees
  );
  const squads: Squad[] = useAppSelector((state) => state.squad.squads);
  const status = useAppSelector((state) => state.squad.status);

  console.log({ status });

  useEffect(() => {
    dispatch(fetchSquads());
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load squads</div>;
  }

  return (
    <div>
      <h1>Squads</h1>
      <ul>
        {squads.map((squad) => (
          <li key={squad.id}>{squad.name}</li>
        ))}
      </ul>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.userid}>{employee.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default PrivateRoute(Squads);
