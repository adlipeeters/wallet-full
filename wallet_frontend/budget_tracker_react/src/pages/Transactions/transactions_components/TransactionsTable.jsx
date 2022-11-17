import React from 'react'

import { useGetTransactionsQuery } from '../../../features/transaction/transactionApiSlice'
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
import Chip from '@mui/material/Chip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'


const TransactionsTable = () => {

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
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTransactionsQuery()
  let tableData
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
              <TableCell>Amount</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Account</TableCell>
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
                <TableCell align="center">{new Date(row.createdAt).toLocaleDateString("en-US")}</TableCell>
                <TableCell align="center">{row?.category?.name}</TableCell>
                <TableCell align="center">{row?.account?.name}</TableCell>
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

export default TransactionsTable