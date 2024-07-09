import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const EmpContactDetail = ({ open, onClose, contact }) => {
  const [editContact, setEditContact] = useState({});

  useEffect(() => {
    if (contact) {
      setEditContact(contact);
    }
  }, [contact]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>상세 정보</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="이름"
              name="empName"
              value={editContact.empName || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="휴대폰"
              name="empMP"
              value={editContact.empMP || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="이메일"
              name="empEmail"
              value={editContact.empEmail || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="메모"
              name="empMemo"
              value={editContact.empMemo || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="집 전화번호"
              name="empHP"
              value={editContact.empHP || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="집 주소"
              name="empHomeAddress"
              value={editContact.empHomeAddress || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="집 팩스 번호"
              name="empHomeFax"
              value={editContact.empHomeFax || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="생일"
              name="empBirthday"
              value={editContact.empBirthday || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="직위"
              name="positionName"
              value={editContact.position?.positionName || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="부서 이름"
              name="departmentName"
              value={editContact.department?.departmentName || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 이름"
              name="companyName"
              value={editContact.company?.companyName || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 주소"
              name="companyAddress"
              value={editContact.company?.companyAddress || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 URL"
              name="companyURL"
              value={editContact.company?.companyURL || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 전화번호"
              name="companyNumber"
              value={editContact.company?.companyNumber || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 팩스"
              name="companyFax"
              value={editContact.company?.companyFax || ""}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmpContactDetail;
