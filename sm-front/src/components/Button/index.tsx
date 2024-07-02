import { commonColors } from '@/../tailwind.config';
import {
  ButtonProps,
  CircularProgress,
  Button as MuiButton,
} from '@mui/material';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface IProps extends ButtonProps {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
  buttonType?: 'primary' | 'secondary';
}
export function Button({
  className,
  children,
  isLoading,
  fullWidth = false,
  buttonType = 'primary',
  ...rest
}: IProps) {
  const classes = {
    primary: 'bg-primary hover:bg-secondary',
    secondary: 'border-primary text-primary hover:border-secondary',
  } as const;

  const style = {
    primary: {
      background: commonColors.primary.DEFAULT,
      '&:hover': {
        backgroundColor: 'red',
      },
    },
    secondary: {
      borderColor: commonColors.primary.DEFAULT,
      color: commonColors.primary.DEFAULT,
    },
  } as const;

  return (
    <MuiButton
      data-testid="button-test"
      variant={buttonType === 'primary' ? 'contained' : 'outlined'}
      fullWidth={fullWidth}
      disableElevation
      {...rest}
      disabled={isLoading || rest?.disabled}
      sx={{
        textTransform: 'none',
        height: '40px',
        ...style[buttonType],
      }}
      className={classNames(className, classes[buttonType])}
    >
      {isLoading && (
        <CircularProgress
          data-testid="button-loading-indicator"
          size={18}
          className="mr-2 text-gray"
        />
      )}
      {children}
    </MuiButton>
  );
}
