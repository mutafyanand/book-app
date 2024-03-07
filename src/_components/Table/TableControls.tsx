import React from 'react';
import { ButtonGroup, IconButton, Tooltip, TablePagination, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterRadioGroup from './RadioGroup';

interface TableControlsProps {
    setIsModalOpen: (open: boolean) => void;
    FetchDbData: () => void;
    filterBy: string | null;
    handleChangeFilterCol: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterValue: string;
    handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    totalCount: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    pageSize: number;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableControls = ({
    setIsModalOpen,
    FetchDbData,
    handleChangeFilterCol,
    handleFilterChange,
    filterBy,
    filterValue,
    totalCount,
    page,
    handleChangePage,
    pageSize,
    handleChangeRowsPerPage,
}: TableControlsProps) => {
    return (
        <Stack
            paddingX={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <ButtonGroup variant="text">
                <Tooltip title="Add Book">
                    <IconButton onClick={() => setIsModalOpen(true)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Refresh data">
                    <IconButton onClick={FetchDbData}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
            <FilterRadioGroup value={filterBy} handleChange={handleChangeFilterCol} handleFilterChange={handleFilterChange} filterValue={filterValue} />
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    );
};

export default TableControls;
