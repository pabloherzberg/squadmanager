import Logo from '@/styles/assets/images/logo.svg';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
export const Header: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="h-10% py-4">
      {children ? (
        children
      ) : (
        <Image className="mx-4 h-12 w-auto" src={Logo} alt="App logo" />
      )}
    </div>
  );
};
