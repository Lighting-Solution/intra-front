import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const CreateContact = ({ onCancel, onCreate, id }) => {
  const [newContact, setNewContact] = useState({
    personalContactName: "",
    personalContactEmail: "",
    personalContactMP: "",
    personalContactMemo: "",
    personalContactBirthday: "",
    positionName: "",
    departmentName: "",
    company: {
      companyName: "",
      companyAddress: "",
      companyURL: "",
      companyNumber: "",
      companyFax: "",
    },
    empId: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("company.")) {
      const companyField = name.split(".")[1];
      setNewContact((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          [companyField]: value,
        },
      }));
    } else {
      setNewContact((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    onCreate(newContact);
    onCancel();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="이름"
            name="personalContactName"
            value={newContact.personalContactName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="휴대폰"
            name="personalContactMP"
            value={newContact.personalContactMP}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="이메일"
            name="personalContactEmail"
            value={newContact.personalContactEmail}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="별명"
            name="personalContactNickName"
            value={newContact.personalContactNickName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="메모"
            name="personalContactMemo"
            value={newContact.personalContactMemo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="생일"
            name="personalContactBirthday"
            value={newContact.personalContactBirthday}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="직위"
            name="positionName"
            value={newContact.positionName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="부서"
            name="departmentName"
            value={newContact.departmentName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="회사 이름"
            name="company.companyName"
            value={newContact.company.companyName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="회사 주소"
            name="company.companyAddress"
            value={newContact.company.companyAddress}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="회사 URL"
            name="company.companyURL"
            value={newContact.company.companyURL}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="회사 전화번호"
            name="company.companyNumber"
            value={newContact.company.companyNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="회사 팩스"
            name="company.companyFax"
            value={newContact.company.companyFax}
            onChange={handleChange}
          />
        </Grid>
        <Button onClick={onCancel}>취소</Button>
        <Button onClick={handleSave} color="primary">
          추가
        </Button>
      </Grid>
    </>
  );
};

export default CreateContact;
