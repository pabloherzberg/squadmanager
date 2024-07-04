import { FC, ReactNode } from 'react';
import { Header } from '../Header';

export const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-auto px-4 sm:px-6 lg:px-10 mt-14">
        {children}
      </div>
    </div>
  );
};
