export enum LoginStatusEnum {
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
  idle = 'idle',
}

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AuthStateInterface {
  user: UserInterface | null;
  status: LoginStatusEnum;
  error: string | null | undefined;
}

export interface Squad {
  id: number;
  name: string;
  members: Array<any>;
}

export interface SquadsState {
  squads: Squad[];
  status: LoginStatusEnum;
  error: string | null | undefined;
}

export interface EmployeeInterface {
  userid: number;
  username: string;
  email: string;
  role: string;
  createdat: string;
}
