import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  Typography,
  Avatar,
  Fab,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PushPinIcon from "@mui/icons-material/PushPin";
import AddressBookModal from "./AddressBookModal";
import ContextMenu from "./ContextMenu";

const chatData = [
  {
    id: 1,
    name: "허각",
    message: "구정물~",
    time: "4시간 전",
    avatar: "https://i.pravatar.cc/150?img=1",
    pinned: false,
    pinnedAt: null,
  },
  {
    id: 2,
    name: "구정모",
    message: "장웅이가 괴롭힌다",
    time: "5시간 전",
    avatar: "https://i.pravatar.cc/150?img=2",
    pinned: false,
    pinnedAt: null,
  },
  {
    id: 3,
    name: "마장용",
    message: "장웅이 일 안하나",
    time: "5시간 전",
    avatar: "https://i.pravatar.cc/150?img=3",
    pinned: false,
    pinnedAt: null,
  },
  // 더미 데이터 추가
];

const ChatList = ({ setCurrentChat, currentChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ x: 32, y: 32 });
  const [addressBookOpen, setAddressBookOpen] = useState(false);
  const [chats, setChats] = useState(chatData);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const buttonRef = useRef(null);
  const chatListRef = useRef(null);
  const isDragging = useRef(false);
  const wasDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const filteredChats = chats
    .filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned && b.pinned) {
        return a.pinnedAt - b.pinnedAt; // 먼저 고정된 순서대로
      }
      return b.pinned - a.pinned; // 고정된 채팅방이 상단에
    });

  const handleAddChat = () => {
    if (!wasDragging.current) {
      setAddressBookOpen(true);
    }
    wasDragging.current = false;
  };

  const handleCreateChat = (selectedContacts) => {
    const newChat = {
      id: chats.length + 1,
      name: selectedContacts.map((contact) => contact.name).join(", "),
      message: "새 채팅방",
      time: "방금",
      avatar: selectedContacts[0].avatar,
      pinned: false,
      pinnedAt: null,
    };
    setChats([...chats, newChat]);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    wasDragging.current = false;
    const rect = buttonRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    buttonRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      wasDragging.current = true;
      const chatListRect = chatListRef.current.getBoundingClientRect();
      const newX = e.clientX - offset.current.x - chatListRect.left;
      const newY = e.clientY - offset.current.y - chatListRect.top;

      const boundedX = Math.max(
        0,
        Math.min(newX, chatListRect.width - buttonRef.current.offsetWidth)
      );
      const boundedY = Math.max(
        0,
        Math.min(newY, chatListRect.height - buttonRef.current.offsetHeight)
      );

      setButtonPosition({
        x: boundedX,
        y: boundedY,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    buttonRef.current.style.cursor = "grab";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleContextMenu = (event, chat) => {
    event.preventDefault();
    setSelectedChat(chat);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDelete = () => {
    setChats(chats.filter((chat) => chat.id !== selectedChat.id));
    handleClose();
  };

  const handlePin = () => {
    const newChats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            pinned: !chat.pinned,
            pinnedAt: chat.pinned ? null : new Date().getTime(),
          }
        : chat
    );
    setChats(newChats);
    handleClose();
  };

  return (
    <Paper
      ref={chatListRef}
      style={{
        height: "100%",
        padding: "16px",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="대화방, 참여자 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Box my={2}>
        {filteredChats.map((chat, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            my={1}
            onContextMenu={(e) => handleContextMenu(e, chat)}
            onClick={() => setCurrentChat(chat)}
            style={{
              cursor: "pointer",
              backgroundColor:
                currentChat && currentChat.id === chat.id
                  ? "#e0f7fa"
                  : "inherit",
            }}
          >
            <Avatar src={chat.avatar} />
            <Box ml={2} flex={1}>
              <Typography variant="body1">{chat.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {chat.message}
              </Typography>
            </Box>
            {chat.pinned && (
              <IconButton size="small">
                <PushPinIcon fontSize="small" color="primary" />
              </IconButton>
            )}
            <Box ml="auto">
              <Typography variant="body2" color="textSecondary">
                {chat.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Fab
        ref={buttonRef}
        color="primary"
        aria-label="add"
        style={{
          position: "absolute",
          left: buttonPosition.x,
          top: buttonPosition.y,
          width: "60px",
          height: "60px",
          backgroundColor: "#1976d2",
          color: "white",
          cursor: "grab",
        }}
        onClick={handleAddChat}
        onMouseDown={handleMouseDown}
      >
        <AddIcon style={{ fontSize: "30px" }} />
      </Fab>
      <AddressBookModal
        open={addressBookOpen}
        onClose={() => setAddressBookOpen(false)}
        onCreateChat={handleCreateChat}
      />
      <ContextMenu
        contextMenu={contextMenu}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handlePin={handlePin}
        isPinned={selectedChat?.pinned}
      />
    </Paper>
  );
};

export default ChatList;
