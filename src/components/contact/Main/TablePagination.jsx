import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Pagination,
} from "@mui/material";

const TablePagination = ({
  rowsPerPage,
  handleChangeRowsPerPage,
  count,
  page,
  handleChangePage,
}) => {
  const safeCount = count || 0; // Ensure count is a valid number

  return (
    <>
      <FormControl sx={{ minWidth: 120, mr: 2 }}>
        <Select
          labelId="rows-per-page-label"
          id="rows-per-page"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          sx={{ height: "40px" }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
      <Stack spacing={2}>
        <Pagination
          count={safeCount}
          page={page + 1}
          onChange={(event, value) => handleChangePage(event, value - 1)}
          color="primary"
          size="medium"
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default TablePagination;
