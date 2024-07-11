import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from "@mui/material";

const PersonalTableHeader = ({
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
        {selectedColumns.includes("personalContactName") && (
          <TableCell
            key="personalContactName"
            sortDirection={orderBy === "personalContactName" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "personalContactName"}
              direction={orderBy === "personalContactName" ? order : "asc"}
              onClick={(event) =>
                handleRequestSort(event, "personalContactName")
              }
            >
              이름
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("personalContactMP") && (
          <TableCell
            key="personalContactMP"
            sortDirection={orderBy === "personalContactMP" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "personalContactMP"}
              direction={orderBy === "personalContactMP" ? order : "asc"}
              onClick={(event) => handleRequestSort(event, "personalContactMP")}
            >
              휴대폰 번호
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("personalContactEmail") && (
          <TableCell
            key="personalContactEmail"
            sortDirection={orderBy === "personalContactEmail" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "personalContactEmail"}
              direction={orderBy === "personalContactEmail" ? order : "asc"}
              onClick={(event) =>
                handleRequestSort(event, "personalContactEmail")
              }
            >
              이메일
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("personalContactNickName") && (
          <TableCell
            key="personalContactNickName"
            sortDirection={
              orderBy === "personalContactNickName" ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === "personalContactNickName"}
              direction={orderBy === "personalContactNickName" ? order : "asc"}
              onClick={(event) =>
                handleRequestSort(event, "personalContactNickName")
              }
            >
              별명
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("personalContactMemo") && (
          <TableCell
            key="personalContactMemo"
            sortDirection={orderBy === "personalContactMemo" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "personalContactMemo"}
              direction={orderBy === "personalContactMemo" ? order : "asc"}
              onClick={(event) =>
                handleRequestSort(event, "personalContactMemo")
              }
            >
              메모
            </TableSortLabel>
          </TableCell>
        )}
        {selectedColumns.includes("personalContactBirthday") && (
          <TableCell
            key="personalContactBirthday"
            sortDirection={
              orderBy === "personalContactBirthday" ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === "personalContactBirthday"}
              direction={orderBy === "personalContactBirthday" ? order : "asc"}
              onClick={(event) =>
                handleRequestSort(event, "personalContactBirthday")
              }
            >
              생일
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
      </TableRow>
    </TableHead>
  );
};

export default PersonalTableHeader;
