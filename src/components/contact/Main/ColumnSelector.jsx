import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";

const columnNames = {
  empName: "이름",
  empEmail: "이메일",
  empMP: "휴대폰",
  empMemo: "메모",
  empHP: "집 전화번호",
  empHomeAddress: "집 주소",
  empHomeFax: "집 팩스",
  empBirthday: "생일",
  companyName: "회사명",
  companyAddress: "회사 주소",
  companyURL: "회사 URL",
  companyNumber: "회사 전화번호",
  companyFax: "회사 팩스",
  positionName: "직위",
  departmentName: "부서 이름",
  personalContactName: "연락처 이름",
  personalContactNickName: "별명",
  personalContactEmail: "연락처 이메일",
  personalContactMP: "연락처 휴대폰",
  personalContactMemo: "연락처 메모",
  personalContactBirthday: "연락처 생일",
};

const filteredColumns = [
  "empName",
  "empEmail",
  "empMP",
  "empMemo",
  "empHP",
  "empHomeAddress",
  "empHomeFax",
  "empBirthday",
  "companyName",
  "companyAddress",
  "companyURL",
  "companyNumber",
  "companyFax",
  "positionName",
  "departmentName",
  "personalContactName",
  "personalContactNickName",
  "personalContactEmail",
  "personalContactMP",
  "personalContactMemo",
  "personalContactBirthday",
];

const ColumnSelector = ({ open, onClose, selectedColumns, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>필드 선택</DialogTitle>
      <DialogContent>
        {filteredColumns.map((column) => (
          <FormControlLabel
            key={column}
            control={
              <Checkbox
                checked={
                  selectedColumns.includes(column) ||
                  [
                    "empName",
                    "empMP",
                    "companyName",
                    "personalContactName",
                    "personalContactMP",
                  ].includes(column)
                }
                onChange={(e) => onChange(column, e.target.checked)}
                disabled={[
                  "empName",
                  "empMP",
                  "companyName",
                  "personalContactName",
                  "personalContactMP",
                ].includes(column)}
              />
            }
            label={columnNames[column]}
          />
        ))}
      </DialogContent>
      <Button onClick={onClose}>닫기</Button>
    </Dialog>
  );
};

export default ColumnSelector;
