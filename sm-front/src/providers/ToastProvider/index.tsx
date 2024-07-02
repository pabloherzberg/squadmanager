import { Toast, ToastType } from '@/components/Toast';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastProps {
  content: string;
  duration?: number;
}
interface ToasterProps extends ToastProps {
  type: ToastType;
  iconType: 'errorIcon' | 'infoIcon' | 'successIcon';
}

interface ToasterProviderProps {
  error: (toaster: ToastProps) => void;
  info: (toaster: ToastProps) => void;
  success: (toaster: ToastProps) => void;
  remove: () => void;
}

const ToastContext = createContext({} as ToasterProviderProps);

export const ToastContextProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToasterProps>();

  const error = useCallback((toaster: ToastProps) => {
    setToast({ ...toaster, type: 'error', iconType: 'errorIcon' });
  }, []);

  const info = useCallback((toaster: ToastProps) => {
    setToast({ ...toaster, type: 'info', iconType: 'infoIcon' });
  }, []);

  const success = useCallback((toaster: ToastProps) => {
    setToast({ ...toaster, type: 'success', iconType: 'successIcon' });
  }, []);

  const remove = useCallback(() => setToast(undefined), []);

  const providerValue: ToasterProviderProps = useMemo(() => {
    return { error, info, success, remove };
  }, [error, info, success, remove]);

  return (
    <ToastContext.Provider value={providerValue}>
      {toast && (
        <Toast
          duration={toast.duration ?? 4000}
          type={toast.type}
          remove={() => remove()}
          iconType={toast.iconType}
        >
          {toast.content}
        </Toast>
      )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastContextProvider;
