import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";

const GroupSelectContact = ({ open, onClose, groups, onConfirm }) => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  useEffect(() => {
    if (!open) {
      setSelectedGroups([]); // 모달 창이 닫힐 때 선택 상태 초기화
    }
  }, [open]);

  const handleToggle = (value) => () => {
    const currentIndex = selectedGroups.indexOf(value);
    const newSelectedGroups = [...selectedGroups];

    if (currentIndex === -1) {
      newSelectedGroups.push(value);
    } else {
      newSelectedGroups.splice(currentIndex, 1);
    }

    setSelectedGroups(newSelectedGroups);
  };

  const handleSelect = () => {
    onConfirm(selectedGroups);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>그룹 지정</DialogTitle>
      <DialogContent>
        <List>
          {groups.map((group) => (
            <ListItem
              key={group.personalGroupId}
              button
              onClick={handleToggle(group.personalGroupId)}
            >
              <Checkbox
                checked={selectedGroups.indexOf(group.personalGroupId) !== -1}
              />
              <ListItemText primary={group.personalGroupName} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSelect} color="primary">
          지정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupSelectContact;
