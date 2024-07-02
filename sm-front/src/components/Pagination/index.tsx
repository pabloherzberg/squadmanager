import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Pagination as MuiPagination, PaginationItem } from '@mui/material';

export interface IProps {
  className?: string;
  page: number;
  onPageChange: (newPage: number) => void;
  count: number;
}

export function Pagination({ className, onPageChange, page, count }: IProps) {
  return (
    <MuiPagination
      className={className}
      count={count}
      page={page}
      onChange={(event: unknown, newPage: number) => onPageChange(newPage)}
      siblingCount={0}
      showFirstButton={true}
      showLastButton={true}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          components={{
            first: () => <KeyboardDoubleArrowLeftIcon />,
            last: () => <KeyboardDoubleArrowRightIcon />,
            next: () => <KeyboardArrowRightIcon />,
            previous: () => <KeyboardArrowLeftIcon />,
          }}
        />
      )}
    />
  );
}
