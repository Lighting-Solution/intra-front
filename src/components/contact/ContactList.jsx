import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const ContactList = ({ empDTOList }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('empName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = empDTOList.map((n) => n.empId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, id) => {
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - empDTOList.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  color='primary'
                  indeterminate={
                    selected.length > 0 && selected.length < empDTOList.length
                  }
                  checked={
                    empDTOList.length > 0 &&
                    selected.length === empDTOList.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all' }}
                />
              </TableCell>
              <TableCell
                key='empName'
                sortDirection={orderBy === 'empName' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'empName'}
                  direction={orderBy === 'empName' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'empName')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                key='companyName'
                sortDirection={orderBy === 'companyName' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'companyName'}
                  direction={orderBy === 'companyName' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'companyName')}
                >
                  Company
                </TableSortLabel>
              </TableCell>
              {/* Add other headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {empDTOList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.empId);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleCheckboxClick(event, row.empId)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.empId}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        onChange={(event) =>
                          handleCheckboxClick(event, row.empId)
                        }
                        inputProps={{
                          'aria-labelledby': `enhanced-table-checkbox-${index}`,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={`enhanced-table-checkbox-${index}`}
                      scope='row'
                      padding='none'
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 1,
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(empDTOList.length / rowsPerPage)}
            page={page + 1}
            onChange={(event, value) => setPage(value - 1)}
            color='primary'
            size='medium'
            shape='rounded'
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactList;
