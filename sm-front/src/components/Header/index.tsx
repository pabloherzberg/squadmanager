import { logout } from '@/store/authSlice';
import { paths } from '@/store/paths';
import { useAppDispatch, useAppSelector } from '@/store/useRedux';
import Logo from '@/styles/assets/images/logo.svg';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);
  const router = useRouter();

  const pathname = usePathname();
  const navItems = [
    {
      label: 'Squads',
      link: paths.squads,
      icon: <AccountBalanceWalletRoundedIcon className="text-md" />,
    },
    {
      label: 'Funcionários',
      link: paths.manager,
      icon: <AccountBalanceWalletRoundedIcon className="text-md" />,
    },
  ];
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <header className="shadow-[0_2px_4px_0_rgb(0,0,0,0.2)] h-14 flex items-center">
        <div className="flex items-center gap-4 px-4 md:px-10 justify-between w-full">
          <Image
            onClick={() => router.replace(paths.signIn)}
            className="h-8 w-[auto] mr-10 cursor-pointer"
            alt="Logo"
            src={Logo}
          />
          {selector.token && (
            <div className="flex items-center gap-2 cursor-pointer text-primary">
              <LogoutIcon />
              <div onClick={() => dispatch(logout())}>Sair</div>
            </div>
          )}
        </div>
      </header>
      {selector.token && (
        <div className="shadow-[0_2px_4px_0_rgb(0,0,0,0.2)] px-4 md:px-10 h-12">
          <div className="md:flex hidden h-full w-full">
            {navItems.map((tab, index) => (
              <Button
                key={tab.label}
                href={tab.link}
                className={classNames(
                  'normal-case rounded-none h-full flex-1',
                  pathname?.includes(tab.link)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray'
                )}
                sx={{
                  borderBottom: pathname?.includes(tab.link)
                    ? '4px solid'
                    : 'none',
                  marginLeft: index === 0 ? 0 : '2px',
                }}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center h-full md:hidden">
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                ...(drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <div className="flex justify-end py-4 px-2">
              <IconButton onClick={() => setDrawerOpen(false)}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton href={item.link} className="pr-8 gap-4">
                    {item.icon}
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
        </div>
      )}
    </div>
  );
}
