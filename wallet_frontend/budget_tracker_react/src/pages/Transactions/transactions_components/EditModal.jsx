import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system'
import Button from '../../../components/button/Button'
import Notification from '../../../components/notification/Notification'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useEditTransactionMutation } from '../../../features/transaction/transactionApiSlice'
import Select from '@mui/material/Select'
import CategoriesOptions from './CategoriesOptions';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8624DB'
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


export default function FormDialog({ open, handleClose, modalData }) {

    const [data, setData] = useState({
        id: modalData.id,
        amount: modalData.amount,
        type: modalData.type,
        category: modalData.category,
    })
    const handleChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value
        })
    }

    const [editTransaction, { isLoading, isSuccess }] = useEditTransactionMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await editTransaction(data).unwrap()
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>

            <Dialog open={open} onClose={handleClose} sx={{}} fullWidth={true} PaperProps={{ sx: { borderRadius: '15px' } }}>
                <DialogTitle>Edit transaction</DialogTitle>
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
                        </Wrapper>
                    </ThemeProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} type="info" title="Cancel"></Button>
                    <Button onClick={handleSubmit} type="primary" title="Save" />
                </DialogActions>
            </Dialog>
            {isSuccess &&
                <Notification isOpen={true} title="The account was successfully edited!" />
            }
        </>
    );
}
