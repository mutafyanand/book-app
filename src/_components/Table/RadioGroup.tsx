import { RadioGroup, FormControlLabel, Radio, TextField, FormControl } from "@mui/material";

interface FilterRadioGroupProps {
    value: string | null;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterValue: string
}

const FilterRadioGroup = ({ handleFilterChange, value, handleChange, filterValue }: FilterRadioGroupProps) => {
    return (
        <FormControl component="fieldset">
            <RadioGroup row onChange={handleChange} value={value}>
                <FormControlLabel value="title" control={<Radio />} label="Title" />
                <FormControlLabel value="isbn" control={<Radio />} label="ISBN" />
                <FormControlLabel value="author" control={<Radio />} label="Author" />
            </RadioGroup>
            <TextField
                autoFocus
                label='Filter'
                value={filterValue}
                onChange={handleFilterChange}
                margin="normal"
                disabled={!value}
                fullWidth
            />
        </FormControl>
    )
}

export default FilterRadioGroup