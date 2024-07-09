import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
} from "@mui/material";

const PersonalContactDetail = ({
  open,
  onClose,
  contact,
  onSave,
  onDelete,
  onGroupDelete,
  currentGroupId,
}) => {
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
    onDelete(editContact.personalContactId);
    onClose();
  };

  const handleGroupRemove = () => {
    onGroupDelete(currentGroupId, editContact.personalContactId);
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
              name="personalContactName"
              value={editContact.personalContactName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="휴대폰"
              name="personalContactMP"
              value={editContact.personalContactMP || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이메일"
              name="personalContactEmail"
              value={editContact.personalContactEmail || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="별명"
              name="personalContactNickName"
              value={editContact.personalContactNickName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="메모"
              name="personalContactMemo"
              value={editContact.personalContactMemo || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="생일"
              name="personalContactBirthday"
              value={editContact.personalContactBirthday || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="직위"
              name="positionName"
              value={editContact.positionName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="부서"
              name="departmentName"
              value={editContact.departmentName || ""}
              onChange={handleChange}
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
        <Button onClick={handleGroupRemove} color="secondary">
          그룹 해제
        </Button>
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

export default PersonalContactDetail;
