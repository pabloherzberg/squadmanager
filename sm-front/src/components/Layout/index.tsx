import { FC, ReactNode } from 'react';
import { Header } from '../Header';

export const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex flex-col h-screen ">
      <Header />
      <main className="h-90% px-4 sm:px-6 lg:px-10 ">{children}</main>
    </main>
  );
};
