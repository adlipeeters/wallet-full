import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Tooltip from '@mui/material/Tooltip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


import EditModal from './EditModal'
import DeleteModal from './DeleteModal'


import { useGetTransactionsQuery } from '../../../features/transaction/transactionApiSlice'


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function CustomPaginationActionsTable() {
    // edit modal
    const [open, setOpen] = React.useState(false);

    // delete modal
    const [openDelete, setOpenDelete] = React.useState(false);

    const [editData, setEditData] = React.useState({
        id: '',
        type: '',
        amount: 0,
        category: ''
    })

    const [deletetData, setDeleteData] = React.useState()

    // edit modal
    const handleClickOpen = (id, type, amount, category) => {
        setEditData({ id: id, type: type, amount: amount, category: category })
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
        data: rows,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTransactionsQuery()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let tableData

    if (isLoading || rows.length === 0) {
        tableData = <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#8624DB' }} />
        </Box>
    } else if (isSuccess) {
        tableData = (
            <>
                <TableContainer component={Paper} sx={{ borderRadius: '30px', padding: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', }}>
                    <Table sx={{
                        minWidth: 500, [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none"
                        }
                    }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Amount</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Account</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" >
                                        {row.amount}
                                    </TableCell>
                                    <TableCell align="center">{row.type === 'income' ?
                                        <>
                                            <Tooltip title="Income">
                                                <Chip
                                                    label="Income"
                                                    sx={{ border: '2px solid #9CD03B', color: '#9CD03B' }}
                                                    variant="outlined"
                                                    icon={<TrendingUpIcon style={{ color: '#9CD03B' }} />}
                                                />
                                            </Tooltip>
                                        </>
                                        :
                                        <>
                                            <Tooltip title="Expense">
                                                <Chip
                                                    label="Expense"
                                                    sx={{ border: '2px solid #DB190C', color: '#DB190C' }}
                                                    variant="outlined"
                                                    icon={<TrendingDownIcon style={{ color: '#DB190C' }} />}
                                                />
                                            </Tooltip>
                                        </>
                                    }</TableCell>
                                    <TableCell align="center">
                                        {new Date(row.createdAt).toLocaleDateString("en-US")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row?.category?.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row?.account?.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton aria-label="Example" onClick={() => handleClickOpen(row.id, row.type, row.amount, row.category.id)}>
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

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={6}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </>
        )
    } else if (isError) {
        tableData = <div>Error</div>
    }



    return (
        <>
            {tableData}
            <EditModal open={open} handleClose={handleClose} modalData={editData} key={editData.id} />
            <DeleteModal open={openDelete} handleClose={handleCloseDelete} id={deletetData} />
        </>
    );
}