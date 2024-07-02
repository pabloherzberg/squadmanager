import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { useEffect } from 'react';
import { BodyText } from '../Typography';

export type ToastType = keyof typeof icons;

export interface ToastProps {
  type: ToastType;
  iconType?: 'errorIcon' | 'infoIcon' | 'successIcon';
  remove: () => void;
  duration?: number;
  children: React.ReactNode;
}

const icons = {
  info: (
    <div className="px-3 bg-yellow-500 self-stretch flex items-center">
      <ErrorOutlineOutlinedIcon className="text-white" />
    </div>
  ),
  success: (
    <div className="px-3 bg-primary self-stretch flex items-center">
      <CheckCircleOutlineOutlinedIcon className="text-white" />
    </div>
  ),
  error: (
    <div className="px-3 bg-red self-stretch flex items-center">
      <CancelOutlinedIcon className="text-white" />
    </div>
  ),
};

export function Toast({ children, type, duration, remove }: ToastProps) {
  useEffect(() => {
    let timeout: null | ReturnType<typeof setTimeout> = null;
    if (duration) {
      timeout = setTimeout(() => {
        remove();
      }, duration);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [remove, duration]);

  return (
    <div className="flex gap-4 items-center absolute">
      {icons[type]}
      <BodyText className="py-5">{children}</BodyText>
    </div>
  );
}
