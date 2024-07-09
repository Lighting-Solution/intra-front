import React from "react";
import { TableBody, TableCell, TableRow, Checkbox } from "@mui/material";
import { stableSort, getComparator } from "../../utils/utils";

const EmpTableBodyRows = ({
  contactList,
  order,
  orderBy,
  page,
  rowsPerPage,
  selected,
  handleRowClick,
  handleCheckboxClick,
  selectedColumns,
}) => {
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const empList = contactList ? contactList : [];
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - empList.length) : 0;

  if (empList.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={selectedColumns.length} align="center">
            데이터가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {stableSort(empList, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.empId);
          const labelId = `enhanced-table-checkbox-${index}`;
          const uniqueKey = `row-${row.empId}-${index}`;
          return (
            <TableRow
              hover
              onClick={(event) => handleRowClick(event, row.empId)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={uniqueKey}
              selected={isItemSelected}
              style={{ cursor: "pointer" }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onChange={(event) => handleCheckboxClick(event, row.empId)}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </TableCell>
              {selectedColumns.includes("empName") && (
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  {row.empName || ""}
                </TableCell>
              )}
              {selectedColumns.includes("empEmail") && (
                <TableCell>{row.empEmail || ""}</TableCell>
              )}
              {selectedColumns.includes("empMP") && (
                <TableCell>{row.empMP || ""}</TableCell>
              )}
              {selectedColumns.includes("empMemo") && (
                <TableCell>{row.empMemo || ""}</TableCell>
              )}
              {selectedColumns.includes("empHP") && (
                <TableCell>{row.empHP || ""}</TableCell>
              )}
              {selectedColumns.includes("empHomeAddress") && (
                <TableCell>{row.empHomeAddress || ""}</TableCell>
              )}
              {selectedColumns.includes("empHomeFax") && (
                <TableCell>{row.empHomeFax || ""}</TableCell>
              )}
              {selectedColumns.includes("empBirthday") && (
                <TableCell>{row.empBirthday || ""}</TableCell>
              )}
              {selectedColumns.includes("empSign") && (
                <TableCell>{row.empSign || ""}</TableCell>
              )}
              {selectedColumns.includes("companyName") && (
                <TableCell>{row.company?.companyName || ""}</TableCell>
              )}
              {selectedColumns.includes("companyAddress") && (
                <TableCell>{row.company?.companyAddress || ""}</TableCell>
              )}
              {selectedColumns.includes("companyURL") && (
                <TableCell>{row.company?.companyURL || ""}</TableCell>
              )}
              {selectedColumns.includes("companyNumber") && (
                <TableCell>{row.company?.companyNumber || ""}</TableCell>
              )}
              {selectedColumns.includes("companyFax") && (
                <TableCell>{row.company?.companyFax || ""}</TableCell>
              )}
              {selectedColumns.includes("positionName") && (
                <TableCell>{row.position?.positionName || ""}</TableCell>
              )}
              {selectedColumns.includes("departmentName") && (
                <TableCell>{row.department?.departmentName || ""}</TableCell>
              )}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 33 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default EmpTableBodyRows;
