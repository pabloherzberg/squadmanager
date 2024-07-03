import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { motion } from 'framer-motion';
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

const variantAnimate = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.5 },
  },
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
    <motion.div
      initial="initial"
      animate="animate"
      variants={variantAnimate}
      className="fixed bg-white bottom-8 right-[16px] md:right-8 w-[calc(100%-32px)] md:w-96 rounded-lg pr-5  z-[100] shadow-[0px_4px_15px_-3px_rgba(0,0,0,0.15)] overflow-hidden"
    >
      <div className="flex gap-4 items-center">
        {icons[type]}
        <BodyText className="py-5">{children}</BodyText>
      </div>
    </motion.div>
  );
}
