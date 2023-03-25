import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '../../../components/button/Button'

import { useDeleteAccountMutation } from '../../../features/account/accountApiSlice'
import Notification from '../../../components/notification/Notification'
import Container from '@mui/material/Container';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose, id }) {
    const [deleteAccount, { isLoading, isSuccess }] = useDeleteAccountMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await deleteAccount(id).unwrap()
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{ sx: { borderRadius: '15px', width: '275px', textAlign: 'center' } }}
            >
                <DialogTitle>{"Delete this account ?"}</DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    Are you sure?
                </DialogContent>
                <DialogActions>
                    <Container sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleClose} type="info" title="Cancel"></Button>
                        <Button onClick={handleSubmit} type="danger" title="Delete" />
                    </Container>
                </DialogActions>
            </Dialog>
            {isSuccess &&
                <Notification isOpen={true} title="The account was successfully deleted!" type="warning" vertical="top" horizontal="right" />
            }
        </>
    );
}