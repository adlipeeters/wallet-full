import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useGetAccountsQuery } from "../../../features/account/accountApiSlice";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import { useDispatch } from "react-redux";
import { setCategories } from "../../../features/account/accountSlice";
import TableFilters from "./TableFilters";

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

export default function AccountsTable() {
  // edit modal
  const [open, setOpen] = React.useState(false);

  // delete modal
  const [openDelete, setOpenDelete] = React.useState(false);

  // edit modal
  const [editData, setEditData] = React.useState({
    id: "",
    name: "",
    amount: 0,
  });

  // delete modal
  const [deletetData, setDeleteData] = React.useState();

  // edit modal
  const handleClickOpen = (id, name, amount) => {
    setEditData({ id: id, name: name, amount: amount });
    setOpen(true);
  };

  // edit modal
  const handleClose = () => {
    setOpen(false);
  };

  // delete modal
  const handleClickOpenDelete = (id) => {
    setDeleteData(id);
    setOpenDelete(true);
  };

  // delete modal
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const dispatch = useDispatch();

  const {
    // data: accounts,
    data: rows,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAccountsQuery();

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

  const [filterText, setFilterText] = React.useState("");

  function handleFilterInputChange(value) {
    setFilterText(value);
  }

  let tableData;

  if (isLoading || rows.length === 0) {
    tableData = (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress sx={{ color: "#2575fc" }} />
      </Box>
    );
  } else if (isSuccess) {
    tableData = (
      <>
        <TableFilters onFilterInputChange={handleFilterInputChange} />
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "30px",
            padding: "20px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
            size="medium"
            aria-label="a dense table"
            stickyHeader={true}
          >
            <TableHead>
              <TableRow>
                <TableCell>Account name</TableCell>
                <TableCell align="center">Amount</TableCell>
                {/* <TableCell align="center">Status</TableCell> */}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">RON {row.amount}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="Example"
                        onClick={() =>
                          handleClickOpen(row.id, row.name, row.amount)
                        }
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ color: "#2575fc" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="Example"
                        onClick={() => handleClickOpenDelete(row.id)}
                      >
                        <DeleteOutlinedIcon sx={{ color: "#2575fc" }} />
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
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
        <EditModal
          open={open}
          handleClose={handleClose}
          modalData={editData}
          key={editData.id}
        />
        <DeleteModal
          open={openDelete}
          handleClose={handleCloseDelete}
          id={deletetData}
        />
      </>
    );
  } else if (isError) {
    tableData = <div>Error</div>;
  }

  return <>{tableData}</>;
}
