import { Book } from "@/types";
import ActionButtons from "./ActionButtons";
import BookFormFields from "./BookFormFields";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface DisplayBookViewProps {
    book: Book;
    handleEdit: () => void;
    router: AppRouterInstance
}

const DisplayBookView = ({ book, router, handleEdit }: DisplayBookViewProps) => {

    return (
        <>
            <ActionButtons
                isEditMode={false}
                onGoBack={() => router.back()}
                onEdit={handleEdit}
            />
            <br />
            <BookFormFields book={book} disabled />
        </>
    )
}

export default DisplayBookView