export enum QueryStatusEnum {
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
  status: QueryStatusEnum;
  error: string | null | undefined;
}

export interface Squad {
  createdat: string;
  createdby: string;
  description: string;
  name: string;
  squadid: number;
}

export interface SquadsState {
  squads: Squad[];
  status: QueryStatusEnum;
  error: string | null | undefined;
}

export enum UserRoleEnum {
  manager = 'Gerente',
  employee = 'Funcionário',
}

export interface SquadMember {
  squadmemberid: number;
  squadid: number;
  userid: number;
  role: UserRoleEnum.manager | UserRoleEnum.employee;
}

export interface EmployeeInterface {
  userid: number;
  username: string;
  email: string;
  role: string;
  createdat: string;
}

export enum TaskStatusEnum {
  todo = 'todo',
  doing = 'doing',
  done = 'done',
  blocked = 'blocked',
}

export interface Task {
  taskid: number;
  title: string;
  description: string;
  duedate: string;
  assignedto: number;
  assignedtoUsername: string;
  squadid: number;
  status: string;
  createdat: string;
}

export interface User {
  userid: number;
  username: string;
  email: string;
  role: string;
  createdat: string;
}

export interface TaskEvidence {
  evidenceid: number;
  taskid: number;
  evidencepath: string | null;
  description: string | null;
  status: string | null;
  uploadedat: string;
}
