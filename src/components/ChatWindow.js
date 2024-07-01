import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = ({ currentChat, setCurrentChat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentChat) {
      setMessages([
        // { text: "정모야", sender: "me", time: "오전 10:09" },
        // { text: "장웅이가 괴롭힌다", sender: "me", time: "오전 10:10" },
        // { text: "구정물", sender: "me", time: "오전 09:00" },
        // { text: "헤이", sender: "me", time: "오후 02:42" },
      ]);
    }
  }, [currentChat]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          text: newMessage,
          sender: "me",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage("");
    }
  };

  const handleLeave = () => {
    setCurrentChat(null);
  };

  return currentChat ? (
    <Paper
      style={{
        height: "100%",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box flex={1} overflowY="auto">
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={currentChat.avatar} />
          <Box ml={2}>
            <Typography variant="h6">{currentChat.name}</Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "auto" }}
            onClick={handleLeave}
          >
            나가기
          </Button>
        </Box>
        <Box>
          {messages.map((message, index) => (
            <Box
              key={index}
              my={2}
              display="flex"
              justifyContent={
                message.sender === "me" ? "flex-end" : "flex-start"
              }
            >
              <Paper
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    message.sender === "me" ? "#DCF8C6" : "#FFFFFF",
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Paper>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ alignSelf: "center", marginLeft: "8px" }}
              >
                {message.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt={2} display="flex">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="메시지를 입력하세요."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  ) : (
    <Typography variant="h6" color="textSecondary" style={{ margin: "auto" }}>
      채팅방을 선택하세요.
    </Typography>
  );
};

export default ChatWindow;
