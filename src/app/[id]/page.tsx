'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { makeRequest } from "@/api";
import { APIRoutes, HttpMethods, ROUTES } from "@/utils/constants";
import { CircularProgress, Typography, Paper, Button, Stack } from "@mui/material";
import { ApiResponseByID, Book, EditBook } from '@/types';
import { toast } from 'react-toastify';
import StyledContainer from '@/_components/common/Container';
import DisplayBookView from '@/_components/BookDetails/DisplayBookView';
import EditBookView from '@/_components/BookDetails/EditBookView';

interface BookDetailsProps {
    params: {
        id: string;
    };
}

const BookDetail = ({ params: { id } }: BookDetailsProps) => {
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedBook, setEditedBook] = useState<EditBook | null>(null);

    useEffect(() => {
        if (id) {
            fetchBookData();
        }
    }, [id]);

    const fetchBookData = async () => {
        setLoading(true);
        try {
            const response = await makeRequest<ApiResponseByID>({
                method: HttpMethods.GET,
                url: APIRoutes.BOOK,
                id
            });
            if (response.success && response && response.data) {
                setBook(response?.data);
            } else {
                toast.error('Failed to fetch data');
            }
        } catch (error) {
            toast.error(`Failed to fetch data: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (book) {
            setEditedBook({
                title: book.title || '',
                author: book.author || '',
                isbn: book.isbn || '',
            });
            setEditMode(true);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleSave = async (id: string | number) => {
        if (editedBook) {
            setLoading(true);
            try {
                const response = await makeRequest<ApiResponseByID>({
                    method: HttpMethods.PUT,
                    url: APIRoutes.BOOK,
                    id,
                    body: { ...editedBook }
                });
                if (response.success && response.data) {
                    setBook(response.data);
                    toast.success('Book updated successfully');
                } else {
                    toast.error('Failed to update book');
                }
            } catch (error) {
                toast.error(`Update failed: ${error}`);
            } finally {
                setLoading(false);
                setEditMode(false);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedBook(prevState => (prevState && {
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <StyledContainer>
            {loading && (
                <CircularProgress />
            )}
            {!loading && !book && (
                <Stack spacing={2}>
                    <Typography variant="h5">
                        Book not found
                    </Typography>
                    <Button onClick={() => router.push(ROUTES.Home)} color="primary">
                        Go Back
                    </Button>
                </Stack>
            )}
            {!loading && book && (
                <Paper elevation={4} style={{ padding: '20px', marginTop: '20px' }}>
                    {editMode && editedBook ? (
                        <EditBookView
                            book={editedBook}
                            handleChange={handleChange}
                            handleSave={() => handleSave(book.id)}
                            handleCancel={handleCancel}
                        />
                    ) : (< DisplayBookView book={book}
                        router={router}
                        handleEdit={handleEdit} />)}
                </Paper>
            )}
        </StyledContainer>
    )
};

export default BookDetail;
