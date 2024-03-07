import { Box, Button } from "@mui/material";

interface ActionButtonsProps {
    isEditMode: boolean;
    onSave?: () => void;
    onCancel?: () => void;
    onEdit?: () => void;
    onGoBack?: () => void;
}

const ActionButtons = ({ isEditMode, onSave, onCancel, onEdit, onGoBack }: ActionButtonsProps) => {
    return (
        <Box display="flex" justifyContent="space-between" mt={2}>
            {isEditMode ? (
                <>
                    <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
                    <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
                </>
            ) : (
                <>
                    <Button variant="contained" onClick={onGoBack}>Go Back</Button>
                    <Button variant="contained" color="primary" onClick={onEdit}>Edit</Button>
                </>
            )}
        </Box>
    );
};

export default ActionButtons;
