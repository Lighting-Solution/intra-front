import React, { useState } from "react";
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

const addressBookData = [
  { id: 1, name: "김철수", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 2, name: "이영희", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "박민수", avatar: "https://i.pravatar.cc/150?img=6" },
  // 더미 데이터 추가
];

const AddressBookModal = ({ open, onClose, onCreateChat }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);

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
    onCreateChat(selectedContacts);
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
              key={contact.id}
              button
              onClick={() => handleToggle(contact)}
            >
              <ListItemAvatar>
                <Avatar src={contact.avatar} />
              </ListItemAvatar>
              <ListItemText primary={contact.name} />
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
