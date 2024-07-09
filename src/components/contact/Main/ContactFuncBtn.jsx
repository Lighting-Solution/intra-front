import React from "react";
import { Box, Button } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactFuncBtn = ({
  deleteContacts,
  designateContactGroup,
  copyContactGroup,
  showButtons,
}) => {
  if (!showButtons) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<GroupIcon />}
        onClick={designateContactGroup}
        sx={{
          marginRight: "8px",
          color: "rgba(0, 0, 0, 0.845)",
          border: "1px solid rgba(0, 0, 0, 0.154)",
        }}
      >
        그룹 지정
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={deleteContacts}
        sx={{
          marginRight: "8px",
          color: "rgba(0, 0, 0, 0.845)",
          border: "1px solid rgba(0, 0, 0, 0.154)",
        }}
      >
        삭제
      </Button>
    </Box>
  );
};

export default ContactFuncBtn;
