import { CircularProgress } from '@mui/material';

export function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <CircularProgress size={30} className="mr-2 text-primary" />
    </div>
  );
}
