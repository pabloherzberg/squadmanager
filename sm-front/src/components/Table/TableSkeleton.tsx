import { commonColors } from '@/../tailwind.config';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export function TableSkeleton() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {[...Array(5)].map((_, index) => (
              <TableCell
                size="small"
                sx={{
                  backgroundColor: commonColors?.primary.DEFAULT,
                  color: commonColors?.white?.DEFAULT,
                  fontSize: '12px',
                  '@media (min-width: 640px)': {
                    fontSize: '18px',
                  },
                }}
                key={index}
              >
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(10)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(5)].map((__, colIndex) => (
                <TableCell size="small" key={colIndex}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
