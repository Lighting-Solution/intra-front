import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
} from "@mui/material";

const AddressBookModal = ({ open, onClose, onCreateChat, currentUserId }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [addressBookData, setAddressBookData] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchContacts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9000/api/v1/intranet/emp/toMessenger"
          );
          const filteredData = response.data.filter(
            (contact) => contact.empId !== currentUserId
          ); // 현재 사용자 제외
          setAddressBookData(filteredData);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      };

      fetchContacts();
    }
  }, [open, currentUserId]);

  const handleToggle = (contact) => {
    const currentIndex = selectedContacts.indexOf(contact);
    const newSelectedContacts = [...selectedContacts];

    if (currentIndex === -1) {
      newSelectedContacts.push(contact);
    } else {
      newSelectedContacts.splice(currentIndex, 1);
    }

    setSelectedContacts(newSelectedContacts);
  };

  const handleCreateChat = () => {
    const selectedIds = selectedContacts.map((contact) => contact.empId);
    onCreateChat(selectedIds);
    setSelectedContacts([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>주소록</DialogTitle>
      <DialogContent>
        <List>
          {addressBookData.map((contact) => (
            <ListItem
              key={contact.empId}
              button
              onClick={() => handleToggle(contact)}
            >
              <ListItemAvatar>
                <Avatar src={contact.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={contact.empName}
                secondary={contact.position.positionName}
              />
              <Checkbox checked={selectedContacts.indexOf(contact) !== -1} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button
          onClick={handleCreateChat}
          color="primary"
          variant="contained"
          disabled={selectedContacts.length === 0}
          style={{
            backgroundColor: selectedContacts.length === 0 ? "gray" : "",
          }}
        >
          채팅방 만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressBookModal;
