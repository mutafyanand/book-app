import React from 'react';
import { CircularProgress, TableBody, TableCell, TableRow } from "@mui/material";
import Link from 'next/link';
import { Book } from "@/types";
import moment from "moment";
import { capitalize } from "@/utils/helpers";
import Button from "@mui/material/Button";

interface TableDataProps {
    data: Book[];
    loading: boolean;
    handleDelete: (id: string | number) => Promise<void>;
}

const CustomTableBody = ({ data, loading, handleDelete }: TableDataProps) => {
    return (
        <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </TableCell>
                </TableRow>
            ) : (
                data.map((row: Book) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th">
                            <Link href={`${row.id}`}>
                                {row.title ? capitalize(row.title) : '(Untitled)'}
                            </Link>
                        </TableCell>
                        <TableCell>{moment(row.createdAt).format('MMMM DD, YYYY, hh:mm:ss A')}</TableCell>
                        <TableCell>{moment(row.updatedAt).format('MMMM DD, YYYY, hh:mm:ss A')}</TableCell>
                        <TableCell>{row.author || 'N/A'}</TableCell>
                        <TableCell>{row.isbn || 'N/A'}</TableCell>
                        <TableCell>
                            <Button color="error" onClick={() => handleDelete(row.id)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
            )
            }
        </TableBody>
    );
};

export default CustomTableBody;
