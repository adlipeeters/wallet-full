import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import { useGetCategoriesQuery } from '../../../features/category/categoryApiSlice';

const CategoriesOptions = ({ category, handleChange }) => {
    const {
        data: categories,
        isLoading: categories_isLoading,
        isSuccess: categories_isSuccess,
        isError: categories_isError,
        error: categories_error,
    } = useGetCategoriesQuery()

    // const {
    //     data: accounts,
    //     isLoading: accounts_isLoading,
    //     isSuccess: accounts_isSuccess,
    //     isError: accounts_isError,
    //     error: accounts_error,
    // } = useGetAccountsQuery()
    let options

    if (categories) {
        options = categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
    }

    return (
        <>
            <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
            {options ? <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select"
                value={options ? category : ''}
                label="Category"
                name="category"
                onChange={handleChange}
                variant="standard"
                sx={{
                    color: '#4E4D4F',
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options}
            </Select> : ''}

        </>
    )
}

export default CategoriesOptions