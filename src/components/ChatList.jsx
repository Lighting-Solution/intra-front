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
const ChatList = ({ setCurrentChat, currentChat }) => {
  // 상태 관리: 검색어, 버튼 위치, 주소록 모달 상태, 채팅 목록, 컨텍스트 메뉴 상태, 선택된 채팅
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

  // useEffect: 컴포넌트가 마운트될 때 채팅 목록을 API에서 가져옴
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/rooms");
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

    fetchChats();
  }, []);

  // 필터링 및 정렬: 검색어와 고정된 채팅방을 기준으로 채팅 목록을 필터링하고 정렬
  const filteredChats = chats
    .filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (chat.message &&
          chat.message.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a.pinned && b.pinned) {
        return a.pinnedAt - b.pinnedAt; // 먼저 고정된 순서대로
      }
      return b.pinned - a.pinned; // 고정된 채팅방이 상단에
    });

  // 채팅방 클릭 핸들러
  const handleChatClick = (chat) => {
    console.log("Selected chat:", chat);
    setCurrentChat(chat);
  };

  // 새 채팅방 추가 버튼 클릭 핸들러: 주소록 모달 열기
  const handleAddChat = () => {
    if (!wasDragging.current) {
      setAddressBookOpen(true);
    }
    wasDragging.current = false;
  };

  // 새 채팅방 생성 핸들러: 선택된 연락처로 새 채팅방 생성
  const handleCreateChat = (selectedContacts) => {
    const newChat = {
      id: chats.length + 1,
      name: selectedContacts[0].name, // 첫 번째 연락처의 이름만 사용
      message: "새 채팅방",
      time: "방금",
      avatar: selectedContacts[0].avatar,
      pinned: false,
      pinnedAt: null,
    };
    setChats([...chats, newChat]);
  };

  // 마우스 다운 핸들러: 드래그 시작
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

  // 마우스 이동 핸들러: 드래그 중 버튼 위치 업데이트
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

  // 마우스 업 핸들러: 드래그 종료
  const handleMouseUp = () => {
    isDragging.current = false;
    buttonRef.current.style.cursor = "grab";
  };

  // 마운트 시 전역 마우스 이벤트 리스너 등록 및 해제
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // 컨텍스트 메뉴 열기 핸들러: 우클릭 시 컨텍스트 메뉴 열기
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

  // 컨텍스트 메뉴 닫기 핸들러
  const handleClose = () => {
    setContextMenu(null);
  };

  // 채팅방 삭제 핸들러
  const handleDelete = () => {
    setChats(chats.filter((chat) => chat.id !== selectedChat.id));
    handleClose();
  };

  // 채팅방 고정 핸들러
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
      {/* 검색창 */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="대화방, 참여자 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Box my={2}>
        {/* 채팅방 목록 표시 */}
        {filteredChats.map((chat, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            my={1}
            onContextMenu={(e) => handleContextMenu(e, chat)}
            onClick={() => handleChatClick(chat)} // Updated to use handleChatClick
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
      {/* 추가 버튼 */}
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
      {/* 주소록 모달 */}
      <AddressBookModal
        open={addressBookOpen}
        onClose={() => setAddressBookOpen(false)}
        onCreateChat={handleCreateChat}
      />
      {/* 컨텍스트 메뉴 */}
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
