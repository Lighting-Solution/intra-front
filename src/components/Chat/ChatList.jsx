import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
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

// ChatList 컴포넌트: 채팅방 목록을 표시하고 관리하는 UI 컴포넌트
const ChatList = ({ setCurrentChat, currentChat, setTestMessages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ x: 32, y: 32 });
  const [addressBookOpen, setAddressBookOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const buttonRef = useRef(null);
  const chatListRef = useRef(null);
  const isDragging = useRef(false);
  const wasDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const currentUserId = parseInt(localStorage.getItem("empId"), 10);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/rooms/${currentUserId}`);
      console.log("Fetched chats:", response.data);
      const adjustedData = response.data.map((chat) => ({
        ...chat,
        name: chat.name,
      }));
      setChats(adjustedData);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const filteredChats = chats
    .filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (chat.message &&
          chat.message.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a.pinned && b.pinned) {
        return a.pinnedAt - b.pinnedAt;
      }
      return b.pinned - a.pinned;
    });

  const handleChatClick = async (chat) => {
    console.log("클릭 핸들러:", chat);
    setCurrentChat(chat);
    console.log("클릭 핸들러 내:", currentChat);
    try {
      const response = await axios.post(
        `http://localhost:9000/api/rooms/messages`, chat
      );
      setTestMessages(response.data);
      const updatedChat = { ...chat, notificationStatus: false };
      setChats((prevChats) =>
        prevChats.map((c) => (c.roomId === chat.roomId ? updatedChat : c))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleAddChat = () => {
    if (!wasDragging.current) {
      setAddressBookOpen(true);
    }
    wasDragging.current = false;
  };

  const handleCreateChat = async (selectedContactIds) => {
    const updatedContactIds = [currentUserId, ...selectedContactIds]; // currentUserId를 배열에 추가
    console.log(updatedContactIds);
    try {
      const response = await axios.post("http://localhost:9000/api/room", {
        empIds: updatedContactIds,
        roomName: "New Chat Room"
      });
      fetchChats();
    } catch (error) {
      console.error("Error creating chat room:", error);
    }

    setAddressBookOpen(false);
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
    console.log('selected', chat);
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

  const handleDelete = async () => {
    console.log('삭제핸들러', chats);
    try {
      const response = await axios.post("http://localhost:9000/api/delRoom", selectedChat);
      console.log("server response:", response.data);
      setChats(chats.filter((chat) => chat.roomId !== selectedChat.roomId));
      handleClose();
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
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
            onClick={() => handleChatClick(chat, 1)}
            style={{
              cursor: "pointer",
              backgroundColor:
                currentChat && currentChat.roomId === chat.roomId
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
            {chat.notificationStatus && (
              <Box
                ml={2}
                p={1}
                bgcolor="red"
                color="white"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="24px"
                height="24px"
              >
                N
              </Box>
            )}
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
        currentUserId={currentUserId} // currentUserId를 prop으로 전달
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
