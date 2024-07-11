import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from "@mui/material";

const EmpTableHeader = ({
  selected,
  contactList,
  handleSelectAllClick,
  order,
  orderBy,
  handleRequestSort,
  selectedColumns,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              selected.length > 0 && selected.length < contactList.length
            }
            checked={
              contactList.length > 0 && selected.length === contactList.length
            }
            onChange={handleSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {selectedColumns.includes("empName") && (
          <TableCell
            key="empName"
            sortDirection={orderBy === "empName" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empName"}
              direction={orderBy === "empName" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empName")}
            >
              이름
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("empEmail") && (
          <TableCell
            key="empEmail"
            sortDirection={orderBy === "empEmail" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empEmail"}
              direction={orderBy === "empEmail" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empEmail")}
            >
              이메일
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("empMP") && (
          <TableCell
            key="empMP"
            sortDirection={orderBy === "empMP" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empMP"}
              direction={orderBy === "empMP" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empMP")}
            >
              휴대폰 번호
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("empMemo") && (
          <TableCell
            key="empMemo"
            sortDirection={orderBy === "empMemo" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empMemo"}
              direction={orderBy === "empMemo" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empMemo")}
            >
              메모
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("empHP") && (
          <TableCell
            key="empHP"
            sortDirection={orderBy === "empHP" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empHP"}
              direction={orderBy === "empHP" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empHP")}
            >
              집 전화번호
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("empHomeAddress") && (
          <TableCell
            key="empHomeAddress"
            sortDirection={orderBy === "empHomeAddress" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empHomeAddress"}
              direction={orderBy === "empHomeAddress" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empHomeAddress")}
            >
              집 주소
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("empHomeFax") && (
          <TableCell
            key="empHomeFax"
            sortDirection={orderBy === "empHomeFax" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empHomeFax"}
              direction={orderBy === "empHomeFax" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empHomeFax")}
            >
              집 팩스 번호
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("empBirthday") && (
          <TableCell
            key="empBirthday"
            sortDirection={orderBy === "empBirthday" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "empBirthday"}
              direction={orderBy === "empBirthday" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "empBirthday")}
            >
              생일
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("companyName") && (
          <TableCell
            key="companyName"
            sortDirection={orderBy === "companyName" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "companyName"}
              direction={orderBy === "companyName" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "companyName")}
            >
              회사 이름
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("companyAddress") && (
          <TableCell
            key="companyAddress"
            sortDirection={orderBy === "companyAddress" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "companyAddress"}
              direction={orderBy === "companyAddress" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "companyAddress")}
            >
              회사 주소
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("companyURL") && (
          <TableCell
            key="companyURL"
            sortDirection={orderBy === "companyURL" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "companyURL"}
              direction={orderBy === "companyURL" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "companyURL")}
            >
              회사 URL
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("companyNumber") && (
          <TableCell
            key="companyNumber"
            sortDirection={orderBy === "companyNumber" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "companyNumber"}
              direction={orderBy === "companyNumber" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "companyNumber")}
            >
              회사 전화번호
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("companyFax") && (
          <TableCell
            key="companyFax"
            sortDirection={orderBy === "companyFax" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "companyFax"}
              direction={orderBy === "companyFax" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "companyFax")}
            >
              회사 팩스 번호
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("positionName") && (
          <TableCell
            key="positionName"
            sortDirection={orderBy === "positionName" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "positionName"}
              direction={orderBy === "positionName" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "positionName")}
            >
              직위
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("departmentName") && (
          <TableCell
            key="departmentName"
            sortDirection={orderBy === "departmentName" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "departmentName"}
              direction={orderBy === "departmentName" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "departmentName")}
            >
              부서 이름
            </TableSortLabel>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default EmpTableHeader;
