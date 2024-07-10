import React, { useState } from "react";
import { Box, Paper, Table, TableContainer, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ColumnSelector from "../ColumnSelector";
import ContactFuncBtn from "../ContactFuncBtn";
import TablePagination from "../TablePagination";
import EmpTableHeader from "./EmpTableHeader";
import EmpTableBodyRows from "./EmpTableBodyRows";
import EmpContactDetail from "./EmpContactDetail";

const EmpContactList = ({
  contactList,
  selectedState,
  updateContact,
  deleteContacts,
  designateContactGroup,
  copyContactGroup,
}) => {
  const { selected, setSelected } = selectedState;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("empName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns, setColumns] = useState([
    "empName",
    "empEmail",
    "empMP",
    "empMemo",
    "empHP",
    "empHomeAddress",
    "empHomeFax",
    "empBirthday",
    "empSign",
    "companyName",
    "companyAddress",
    "companyURL",
    "companyNumber",
    "companyFax",
    "positionName",
    "departmentName",
  ]);
  const [selectedColumns, setSelectedColumns] = useState([
    "empName",
    "empMP",
    "companyName",
  ]);
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = contactList.map((item) => item.empId);
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

  const handleRowClick = (event, id) => {
    if (event.target.type === "checkbox") return;
    const contact = contactList.find((c) => c.empId === id);
    setSelectedContact(contact);
    setOpenDetailModal(true);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnChange = (column, checked) => {
    if (checked) {
      setSelectedColumns((prev) => [...prev, column]);
    } else {
      setSelectedColumns((prev) => prev.filter((col) => col !== column));
    }
  };

  const handleSave = (updatedContact) => {
    updateContact(updatedContact);
  };

  const handleDelete = (contactId) => {
    deleteContacts(contactId);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <ContactFuncBtn
          deleteContacts={deleteContacts}
          designateContactGroup={designateContactGroup}
          copyContactGroup={copyContactGroup}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TablePagination
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={Math.ceil(contactList.length / rowsPerPage)}
            page={page}
            handleChangePage={handleChangePage}
          />
          <IconButton onClick={() => setOpenColumnSelector(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EmpTableHeader
            selected={selected}
            contactList={contactList}
            handleSelectAllClick={handleSelectAllClick}
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
            selectedColumns={selectedColumns}
          />
          <EmpTableBodyRows
            contactList={contactList}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            handleRowClick={handleRowClick}
            handleCheckboxClick={handleCheckboxClick}
            selectedColumns={selectedColumns}
          />
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}></Box>
      <ColumnSelector
        open={openColumnSelector}
        onClose={() => setOpenColumnSelector(false)}
        columns={columns}
        selectedColumns={selectedColumns}
        onChange={handleColumnChange}
      />
      {selectedContact && (
        <EmpContactDetail
          open={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          contact={selectedContact}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default EmpContactList;
