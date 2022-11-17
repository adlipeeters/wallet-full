import React, { useState } from 'react'
import Box from '../../components/box/Box'
import AccountsTable from './accounts_components/AccountsTable'
import AddModal from './accounts_components/AddModal'
// import Button from '@mui/material/Button';
import Button from '../../components/button/Button'

export const Accounts = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="row">
            <div className="col-md-3 mb">
                <Box>

                </Box>
            </div>
            <div className="col-md-3 mb">
                <Box>

                </Box>
            </div>
            <div className="col-md-3 mb">
                <Box>

                </Box>
            </div>
            <div className="col-md-3 mb">
                <Box>

                </Box>
            </div>
            <div className="col-12">
                <div className="row"></div>
                <div className="row">
                    <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12 mt-3 mb-4">
                        <Button type="primary" onClick={handleClickOpen} title="Add account" />
                    </div>
                </div>
                <AddModal open={open} handleClose={handleClose} />
                <AccountsTable />
            </div>
        </div>
    )
}