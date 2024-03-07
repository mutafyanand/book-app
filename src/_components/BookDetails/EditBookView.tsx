import { EditBook } from "@/types";
import ActionButtons from "./ActionButtons";
import BookFormFields from "./BookFormFields";
import { DisplayBookViewProps } from "./DisplayBookView";

interface EditBookViewProps {
    book: EditBook;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
    handleCancel: () => void;
}

const EditBookView = ({ book, handleChange, handleSave, handleCancel }: EditBookViewProps) => (
    <>
        <BookFormFields book={book} handleChange={handleChange} />
        <br />
        <ActionButtons
            isEditMode={true}
            onSave={() => handleSave()}
            onCancel={handleCancel}
        />
    </>
);

export default EditBookView