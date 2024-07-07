import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TableSortLabel from "@mui/material/TableSortLabel";
import React from "react";

const ContactList = ({ contactList, selectedState }) => {
  const { selected, setSelected } = selectedState;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      let newSelected = [];
      contactList.forEach((item) => {
        if ("empId" in item) {
          newSelected.push(item.empId);
        } else if ("personalContactId" in item) {
          newSelected.push(item.personalContactId);
        }
      });
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleRowClick = (id) => {
    console.log(`Row with id ${id} clicked`);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contactList.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < contactList.length
                  }
                  checked={
                    contactList.length > 0 &&
                    selected.length === contactList.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all" }}
                />
              </TableCell>
              <TableCell
                key="name"
                sortDirection={orderBy === "name" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="companyName"
                sortDirection={orderBy === "companyName" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "companyName"}
                  direction={orderBy === "companyName" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "companyName")}
                >
                  Company
                </TableSortLabel>
              </TableCell>
              {/* 필드 동적 추가 필요 */}
            </TableRow>
          </TableHead>
          <TableBody>
            {contactList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.empId);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={() => handleRowClick(row.empId)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.empId}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) =>
                          handleCheckboxClick(event, row.empId)
                        }
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.empName}
                    </TableCell>
                    <TableCell>{row.company.companyName}</TableCell>
                    {/* Add other cells as needed */}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1,
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(contactList.length / rowsPerPage)}
            page={page + 1}
            onChange={(event, value) => setPage(value - 1)}
            color="primary"
            size="medium"
            shape="rounded"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactList;
