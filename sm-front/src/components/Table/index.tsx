import { commonColors } from '@/../tailwind.config';
import { Pagination } from '@/components/Pagination';
import { BodyText } from '@/components/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React from 'react';
import { TableSkeleton } from './TableSkeleton';
export interface ITableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (row: T) => JSX.Element;
    labelBold?: boolean;
    hasSort?: boolean;
  }[];
  loading?: boolean;
  withAlternateRowColors?: boolean;
  paginationData?: {
    numberOfPages: number;
    currentPage: number;
  };
  onRowClick?: (index: number) => void;
  handleChangePage?: (newPage: number) => void;
  withoutDataComponent?: React.ReactNode;
  error?: boolean;
  orderBy?: string;
  orderFunc?: (columnId: string) => void;
  order?: 'ASC' | 'DESC';
}

export function CustomTable<T>({
  data,
  columns,
  onRowClick,
  handleChangePage,
  loading = false,
  withAlternateRowColors = false,
  paginationData,
  withoutDataComponent,
  orderBy,
  orderFunc,
  order,
  error,
}: ITableProps<T>) {
  const renderCellContent = (columnKey: keyof T, cellData: any) => {
    if (columnKey === 'bmpAccountStatus') {
      const statusColors: { [key: string]: string } = {
        LIBERADA: '#4caf50',
        BLOQUEADA: '#f44336',
        NEGADA: '#ff9800',
        ABERTA: '#2196f3',
      };

      return (
        <b>
          <Chip
            label={cellData}
            sx={{ background: statusColors[cellData] || '#ccc' }}
          />
        </b>
      );
    }

    if (columnKey === 'status') {
      const statusColors: { [key: string]: string } = {
        EmAbertura: '#FBB208',
        Encerrada: '#D32F2F',
        Ativo: '#21BA45',
      };

      return (
        <b>
          <div
            style={{ color: statusColors[cellData] || '#ccc' }}
            className="uppercase"
          >
            {cellData}
          </div>
        </b>
      );
    }

    return cellData;
  };

  const isOdd = (num: number) => {
    return num % 2 !== 0;
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                size="small"
                key={index}
                sx={{
                  backgroundColor: commonColors?.primary.DEFAULT,
                  color: commonColors?.white?.DEFAULT,
                  fontSize: '12px',
                  '@media (min-width: 640px)': {
                    fontSize: '18px',
                  },
                  fontWeight: column.labelBold ? 'bold' : 'normal',
                  letterSpacing: '0px',
                }}
                align="center"
                className="whitespace-nowrap"
              >
                {column?.hasSort && orderFunc ? (
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={
                      orderBy === column.key
                        ? (order?.toLowerCase() as 'asc' | 'desc')
                        : 'asc'
                    }
                    onClick={() => orderFunc(column.key as string)}
                    className="!text-white"
                    sx={{
                      '&.MuiTableSortLabel-root:hover': {
                        color: 'white',
                      },
                      '&.Mui-active': {
                        color: 'white',
                      },
                      '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                      },
                    }}
                  >
                    <BodyText>{column.label}</BodyText>
                  </TableSortLabel>
                ) : (
                  <BodyText>{column.label}</BodyText>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {error ? (
            <TableRow className="!bg-red-200">
              <TableCell colSpan={columns.length}>
                <div className="flex gap-4 ">
                  <ErrorOutlineIcon className="text-red"></ErrorOutlineIcon>
                  <div>
                    <b>Ocorreu um erro ao obter os dados</b>
                    <p>
                      Tente novamente mais tarde ou entre em contato com nossa
                      equipe de suporte.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            withoutDataComponent ?? (
              <TableRow className="bg-blue-200">
                <TableCell colSpan={columns.length}>
                  <div className="flex gap-4 ">
                    <InfoOutlinedIcon className="text-blue"></InfoOutlinedIcon>
                    <div>
                      <b>Nenhum dado encontrado</b>
                      <p>Altere os filtros para obter algum resultado</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(rowIndex)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    size="small"
                    key={colIndex}
                    className={
                      withAlternateRowColors
                        ? isOdd(rowIndex)
                          ? 'bg-gray-400'
                          : 'bg-white'
                        : 'bg-white'
                    }
                    align="center"
                  >
                    {column.render
                      ? column.render(row)
                      : renderCellContent(column.key, row[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {paginationData && (
        <div className="flex justify-end px-4 py-1">
          <Pagination
            count={paginationData?.numberOfPages}
            page={paginationData?.currentPage}
            onPageChange={(newPage) => handleChangePage?.(newPage)}
          />
        </div>
      )}
    </TableContainer>
  );
}
