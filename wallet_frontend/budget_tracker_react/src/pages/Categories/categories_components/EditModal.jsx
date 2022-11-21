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
import Container from '@mui/material/Container';


import { useEditCategoryMutation } from '../../../features/category/categoryApiSlice'
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
const EditModal = ({ open, handleClose, modalData }) => {
    const [data, setData] = useState({
        id: modalData.id,
        name: modalData.name,
    })

    const handleChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value
        })
    }

    const [addCategory, { isLoading, isSuccess }] = useEditCategoryMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await addCategory(data).unwrap()
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>

            <Dialog open={open} onClose={handleClose} sx={{}} fullWidth={true} PaperProps={{ sx: { borderRadius: '15px' } }}>
                <DialogTitle>Edit category</DialogTitle>
                <DialogContent>
                    <ThemeProvider theme={theme}>
                        <Wrapper>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    autoComplete="off"
                                    margin="dense"
                                    label="Name"
                                    type="text"
                                    name="name"
                                    value={data.name}
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
                <Notification isOpen={true} title="The category was successfully edited!" type="success" vertical="top" horizontal="right"/>
            }
        </>
    )
}

export default EditModal