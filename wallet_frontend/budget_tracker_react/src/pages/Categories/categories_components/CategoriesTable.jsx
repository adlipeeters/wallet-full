import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '../../../components/button/Button'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { useGetCategoriesQuery } from '../../../features/category/categoryApiSlice';

const CategoriesTable = () => {
    // edit modal
    const [open, setOpen] = React.useState(false);

    // delete modal
    const [openDelete, setOpenDelete] = React.useState(false);

    const [editData, setEditData] = React.useState({
        id: '',
        name: '',
        amount: 0,
    })

    const [deletetData, setDeleteData] = React.useState()

    // edit modal
    const handleClickOpen = (id, name, amount) => {
        setEditData({ id: id, name: name, amount: amount })
        setOpen(true);
    };

    // edit modal
    const handleClose = () => {
        setOpen(false);
    };

    // delete modal
    const handleClickOpenDelete = (id) => {
        setDeleteData(id)
        setOpenDelete(true);
    };

    // delete modal
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery()

    let tableData
    console.log(data)
    if (isLoading || data.length === 0) {
        tableData = <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#8624DB' }} />
        </Box>
    }
    else if (isSuccess) {
        tableData = (<>
            <TableContainer component={Paper} sx={{ borderRadius: '30px', padding: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', }}>
                <Table sx={{
                    minWidth: 650, [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                    }
                }} size="medium" aria-label="a dense table" stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category name</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isSuccess && data?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, "&:last-child td": {
                                        borderBottom: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit">
                                        <IconButton aria-label="Example" onClick={() => handleClickOpen(row.id, row.name, row.amount)}>
                                            <ModeEditOutlineOutlinedIcon sx={{ color: '#8624DB' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="Example" onClick={() => handleClickOpenDelete(row.id)}>
                                            <DeleteOutlinedIcon sx={{ color: '#8624DB' }} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditModal open={open} handleClose={handleClose} modalData={editData} key={editData.id} />
            <DeleteModal open={openDelete} handleClose={handleCloseDelete} id={deletetData} />
        </>
        )
    } else if (isError) {
        tableData = <div>Error</div>
    }

    return (
        <>
            {tableData}
        </>
    );
}

export default CategoriesTable