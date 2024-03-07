import { Book, EditBook } from "@/types";
import { TextField, Typography } from "@mui/material";

interface BookFormFieldsProps {
    book: Book | EditBook;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const BookFormFields = ({ book, handleChange, disabled }: BookFormFieldsProps) => (
    <>
        <Typography variant="h4">Book Details </Typography>
        <TextField label="Title" name="title" value={book.title} onChange={handleChange} fullWidth margin="normal" disabled={disabled} />
        <TextField label="Author" name="author" value={book.author} onChange={handleChange} fullWidth margin="normal" disabled={disabled} />
        <TextField label="ISBN" name="isbn" value={book.isbn} onChange={handleChange} fullWidth margin="normal" disabled={disabled} />
    </>
);

export default BookFormFields