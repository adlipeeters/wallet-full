import React, { useState } from "react";
import Box from "../../components/box/Box";
import AccountsTable from "./accounts_components/AccountsTable";
import TableWithPagination from "./accounts_components/TableWithPagination";
import AddModal from "./accounts_components/AddModal";
// import Button from '@mui/material/Button';
import Button from "../../components/button/Button";
import TableFilters from "./accounts_components/TableFilters";

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
      <div className="col-12 text-center mb">
        {/* <TableFilters /> */}
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12 mt-3 mb-4">
            <Button
              type="primary"
              onClick={handleClickOpen}
              title="Add account"
            />
          </div>
        </div>
        <AddModal open={open} handleClose={handleClose} />
        {/* <AccountsTable /> */}
        <TableWithPagination />
      </div>
    </div>
  );
};
