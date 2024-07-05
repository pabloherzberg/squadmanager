import { FC, ReactNode } from 'react';
import { Header } from '../Header';

export const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-auto p-4 sm:p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
};
