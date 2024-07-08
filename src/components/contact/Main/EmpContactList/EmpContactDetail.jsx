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

const EmpContactDetail = ({ open, onClose, contact, onSave, onDelete }) => {
  const [editContact, setEditContact] = useState({});

  useEffect(() => {
    if (contact) {
      setEditContact(contact);
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editContact);
    onClose();
  };

  const handleDelete = () => {
    onDelete(editContact.empId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>상세 정보</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이름"
              name="empName"
              value={editContact.empName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="휴대폰"
              name="empMP"
              value={editContact.empMP || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이메일"
              name="empEmail"
              value={editContact.empEmail || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="메모"
              name="empMemo"
              value={editContact.empMemo || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="집 전화번호"
              name="empHP"
              value={editContact.empHP || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="집 주소"
              name="empHomeAddress"
              value={editContact.empHomeAddress || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="집 팩스 번호"
              name="empHomeFax"
              value={editContact.empHomeFax || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="생일"
              name="empBirthday"
              value={editContact.empBirthday || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="직위"
              name="positionName"
              value={editContact.position?.positionName || ""}
              onChange={(e) =>
                setEditContact((prev) => ({
                  ...prev,
                  position: { ...prev.position, positionName: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="부서 이름"
              name="departmentName"
              value={editContact.department?.departmentName || ""}
              onChange={(e) =>
                setEditContact((prev) => ({
                  ...prev,
                  department: {
                    ...prev.department,
                    departmentName: e.target.value,
                  },
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 이름"
              name="companyName"
              value={editContact.company?.companyName || ""}
              onChange={(e) =>
                setEditContact((prev) => ({
                  ...prev,
                  company: { ...prev.company, companyName: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 주소"
              name="companyAddress"
              value={editContact.company?.companyAddress || ""}
              onChange={(e) =>
                setEditContact((prev) => ({
                  ...prev,
                  company: { ...prev.company, companyAddress: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 URL"
              name="companyURL"
              value={editContact.company?.companyURL || ""}
              onChange={(e) =>
                setEditContact((prev) => ({
                  ...prev,
                  company: { ...prev.company, companyURL: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 전화번호"
              name="companyNumber"
              value={editContact.company?.companyNumber || ""}
              onChange={(e) =>
                setEditContact((prev) => ({
                  ...prev,
                  company: { ...prev.company, companyNumber: e.target.value },
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="회사 팩스"
              name="companyFax"
              value={editContact.company?.companyFax || ""}
              onChange={(e) =>
                setEditContact((prev) => ({
                  ...prev,
                  company: { ...prev.company, companyFax: e.target.value },
                }))
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="secondary">
          삭제
        </Button>
        <Button onClick={handleSave} color="primary">
          수정
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmpContactDetail;
