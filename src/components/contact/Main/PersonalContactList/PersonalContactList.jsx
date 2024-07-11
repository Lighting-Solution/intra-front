import React, { useState } from "react";
import { Box, Paper, Table, TableContainer, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ColumnSelector from "../ColumnSelector";
import ContactFuncBtn from "../ContactFuncBtn";
import TablePagination from "../TablePagination";
import PersonalTableHeader from "./PersonalTableHeader";
import PersonalTableBodyRows from "./PersonalTableBodyRows";
import PersonalContactDetail from "./PersonalContactDetail";

const PersonalContactList = ({
  contactList,
  selectedState,
  updateContact,
  deleteContacts,
  designateContactGroup,
  copyContactGroup,
  onGroupDelete,
  currentGroupId,
}) => {
  const { selected, setSelected } = selectedState;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("personalContactName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns, setColumns] = useState([
    "personalContactName",
    "personalContactEmail",
    "personalContactMP",
    "personalContactMemo",
    "personalContactBirthday",
    "positionName",
    "departmentName",
    "companyName",
    "companyAddress",
    "companyURL",
    "companyNumber",
    "companyFax",
  ]);
  const [selectedColumns, setSelectedColumns] = useState([
    "personalContactName",
    "personalContactMP",
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
      let newSelected = [];
      contactList.forEach((item) => {
        if ("personalContactId" in item) {
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

  const handleRowClick = (event, id) => {
    if (event.target.type === "checkbox") return;
    const contact = contactList.find((c) => c.personalContactId === id);
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
          showButtons={true}
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
          <PersonalTableHeader
            selected={selected}
            contactList={contactList}
            handleSelectAllClick={handleSelectAllClick}
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
            selectedColumns={selectedColumns}
          />
          <PersonalTableBodyRows
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
        <PersonalContactDetail
          open={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          contact={selectedContact}
          onSave={handleSave}
          onDelete={handleDelete}
          onGroupDelete={onGroupDelete}
          currentGroupId={currentGroupId}
        />
      )}
    </Box>
  );
};

export default PersonalContactList;
