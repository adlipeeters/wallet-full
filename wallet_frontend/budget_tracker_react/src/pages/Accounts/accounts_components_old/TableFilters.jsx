import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

const styles = {
  input: {
    borderRadius: 10,
    borderColor: "#f44336",
    borderWidth: 2,
    padding: "10px 14px",
  },
};
const TableFilters = ({ onFilterInputChange }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    onFilterInputChange(value);
  };

  return (
    <>
      <FormControl variant="standard" sx={{ float: "right" }}>
        <TextField
          autoFocus
          autoComplete="off"
          margin="dense"
          label="Search"
          type="text"
          name="name"
          //   value={data.name}
            onChange={handleInputChange}
          sx={{
            "& fieldset": {
              borderRadius: "50px",
            },
            marginBottom: "15px",
          }}
          fullWidth
          color="primary"
          variant="outlined"
          InputProps={{
            sx: {
              "& input": {
                color: "#4E4D4F",
                borderColor: "#8624DB",
              },
            },
          }}
        />
      </FormControl>
    </>
  );
};

export default TableFilters;
