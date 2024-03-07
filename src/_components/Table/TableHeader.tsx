import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { TABLE_COLUMNS } from '@/utils/constants';

interface TableHeaderProps {
  sorting: any;
  handleSortChange: (field: string) => void;
}

const TableHeader = ({ sorting, handleSortChange }: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {TABLE_COLUMNS.map(column => (
          <TableCell key={column.name}>
            {column.label}
            {column.name ? (
              <TableSortLabel
                active={sorting.sortBy === column.name}
                direction={sorting.sortBy === column.name ? sorting.sortOrder.toLowerCase() : 'asc'}
                onClick={() => handleSortChange(column.name)}
              />
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
