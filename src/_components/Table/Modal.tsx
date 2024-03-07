import { useState } from 'react';
import { Button, Dialog, TextField, Stack, Box, Typography } from '@mui/material';
import { makeRequest } from '@/api';
import { APIRoutes, HttpMethods } from '@/utils/constants';
import { ApiResponseByID, Book } from '@/types';
import { toast } from 'react-toastify';

interface AddBookModalProps {
    open: boolean;
    handleClose: () => void;
    onAdd: (newBook: Book) => void;
}

const AddBookModal = ({ open, handleClose, onAdd }: AddBookModalProps) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');

    const handleCloseModal = () => {
        setTitle('')
        setAuthor('')
        setIsbn('')
        handleClose()
    }

    const handleAddBook = () => {
        const newBook = { title, author, isbn };
        makeRequest<ApiResponseByID>({
            method: HttpMethods.POST,
            url: APIRoutes.BOOK,
            body: newBook
        }).then((res) => {
            if (res.success && res.data) {
                onAdd(res.data);
                handleCloseModal()
            } else {
                toast.error('Failed to create book');
            }
        }).catch((error) => {
            toast.error(`Failed to create book: ${error}`);
        })
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
        >
            <Stack component="form"
                padding={5}
                sx={{
                    width: '50ch',
                }}
                autoComplete="off"
                spacing={2}
            >
                <Typography variant="h4" gutterBottom>
                    Add Book
                </Typography>
                <TextField
                    required
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    required
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    margin="normal"
                />
                <TextField
                    required
                    label="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    margin="normal"
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleAddBook}>Add</Button>
                    <Button variant="contained" color="secondary"
                        onClick={handleCloseModal}>Cancel</Button>
                </Box>
            </Stack>
        </Dialog>
    );
};

export default AddBookModal;
