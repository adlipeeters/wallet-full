import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '../../../components/button/Button'

import { useDeleteTransactionMutation } from '../../../features/transaction/transactionApiSlice'
import Notification from '../../../components/notification/Notification'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteModal = ({ open, handleClose, id }) => {
    const [deleteTransaction, { isLoading, isSuccess }] = useDeleteTransactionMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await deleteTransaction(id).unwrap()
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
                PaperProps={{ sx: { borderRadius: '15px' } }}
            >
                <DialogTitle>{"Delete this transaction ?"}</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} type="info" title="Cancel"></Button>
                    <Button onClick={handleSubmit} type="danger" title="Delete" />
                </DialogActions>
            </Dialog>
            {isSuccess &&
                <Notification isOpen={true} title="The transaction was successfully deleted!" />
            }
        </>
    )
}

export default DeleteModal