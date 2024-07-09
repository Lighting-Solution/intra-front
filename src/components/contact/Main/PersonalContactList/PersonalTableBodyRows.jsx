import React from "react";
import { TableBody, TableCell, TableRow, Checkbox } from "@mui/material";
import { stableSort, getComparator } from "../../utils/utils";

const PersonalTableBodyRows = ({
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
  const personalContactList = contactList ? contactList : [];
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contactList.length) : 0;
  if (personalContactList.length === 0) {
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
      {stableSort(personalContactList, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.personalContactId);
          const labelId = `enhanced-table-checkbox-${index}`;
          const uniqueKey = `row-${row.personalContactId}-${index}`;
          return (
            <TableRow
              hover
              onClick={(event) => handleRowClick(event, row.personalContactId)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={uniqueKey}
              selected={isItemSelected}
              style={{ cursor: "pointer" }} // 클릭 가능한 커서 스타일
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onChange={(event) =>
                    handleCheckboxClick(event, row.personalContactId)
                  }
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </TableCell>
              {selectedColumns.includes("personalContactName") && (
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  {row.personalContactName || ""}
                </TableCell>
              )}
              {selectedColumns.includes("personalContactMP") && (
                <TableCell>{row.personalContactMP || ""}</TableCell>
              )}
              {selectedColumns.includes("personalContactEmail") && (
                <TableCell>{row.personalContactEmail || ""}</TableCell>
              )}
              {selectedColumns.includes("personalContactNickName") && (
                <TableCell>{row.personalContactNickName || ""}</TableCell>
              )}
              {selectedColumns.includes("personalContactMemo") && (
                <TableCell>{row.personalContactMemo || ""}</TableCell>
              )}
              {selectedColumns.includes("personalContactBirthday") && (
                <TableCell>{row.personalContactBirthday || ""}</TableCell>
              )}
              {selectedColumns.includes("positionName") && (
                <TableCell>{row.positionName || ""}</TableCell>
              )}
              {selectedColumns.includes("departmentName") && (
                <TableCell>{row.departmentName || ""}</TableCell>
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

export default PersonalTableBodyRows;
