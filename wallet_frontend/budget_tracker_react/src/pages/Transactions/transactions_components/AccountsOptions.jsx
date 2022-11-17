import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import { useGetAccountsQuery } from '../../../features/account/accountApiSlice';
const AccountsOptions = ({ account, handleChange }) => {
    const {
        data: accounts,
        isLoading: accounts_isLoading,
        isSuccess: accounts_isSuccess,
        isError: accounts_isError,
        error: accounts_error,
    } = useGetAccountsQuery()

    let options

    if (accounts) {
        options = accounts.map((account) => <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>)
    }

    return (
        <>
            <InputLabel id="demo-simple-select-standard-label">Account</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select"
                value={options ? account : ''}
                label="Account"
                name="account"
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
            </Select>
        </>
    )
}

export default AccountsOptions