import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import Button from '../../../components/button/Button'
import Notification from '../../../components/notification/Notification'

import { useAddTransactionMutation } from '../../../features/transaction/transactionApiSlice'
import { useGetCategoriesQuery } from '../../../features/category/categoryApiSlice';
import { useGetAccountsQuery } from '../../../features/account/accountApiSlice';
import CategoriesOptions from './CategoriesOptions';
import AccountsOptions from './AccountsOptions';

import { useDispatch } from 'react-redux'
import { apiSlice } from "../../../app/api/apiSlice";
import Container from '@mui/material/Container';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2575fc'
        },
    },
});

const Wrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
})

const Label = styled('p')({
    color: "#4E4D4F",
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: '16px',
})


export default function FormDialog({ open, handleClose }) {
    const [data, setData] = useState({
        amount: '',
        type: '',
        category: '',
        account: '',
    })


    const handleChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value
        })
    }


    const [addTransaction, { isLoading, isSuccess }] = useAddTransactionMutation()

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        try {
            const result = await addTransaction(data).unwrap()
            handleClose()
            setData({
                amount: '',
                type: '',
                category: '',
                account: '',
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} sx={{}} fullWidth={true} PaperProps={{ sx: { borderRadius: '15px' } }}>
                <DialogTitle>Add transaction</DialogTitle>
                <DialogContent>
                    <ThemeProvider theme={theme}>
                        <Wrapper>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    autoComplete="off"
                                    margin="dense"
                                    label="Amount"
                                    type="text"
                                    name="amount"
                                    value={data.amount}
                                    onChange={handleChange}
                                    fullWidth
                                    color="primary"
                                    variant="standard"
                                    sx={{ background: '' }}
                                    InputProps={{
                                        sx: {
                                            "& input": {
                                                color: '#4E4D4F',
                                                borderColor: '#8624DB'
                                            }
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select"
                                    value={data.type}
                                    label="Type"
                                    name="type"
                                    onChange={handleChange}
                                    variant="standard"
                                    sx={{
                                        color: '#4E4D4F',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='income'>Income</MenuItem>
                                    <MenuItem value='expense'>Expense</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <CategoriesOptions category={data.category} handleChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <AccountsOptions account={data.account} handleChange={handleChange} />
                            </FormControl>
                        </Wrapper>
                    </ThemeProvider>
                </DialogContent>
                <DialogActions>
                    <Container sx={{ textAlign: 'right', marginBottom: '10px' }}>
                        <Button onClick={handleClose} type="info" title="Cancel" margin="0 10px 0 0" />
                        <Button onClick={handleSubmit} type="primary" title="Save" />
                    </Container>
                </DialogActions>
            </Dialog>
            {isSuccess &&
                <Notification isOpen={true} title="The transaction was completed successfully!" />
            }
        </>
    );
}
