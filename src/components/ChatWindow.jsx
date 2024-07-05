import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatWindow = ({ currentChat, setCurrentChat, testMessages }) => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [client, setClient] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (testMessages) {
      setMessages(testMessages);
      setFilteredMessages(testMessages);
    }
  }, [testMessages]);

  useEffect(() => {
    if (searchTerm) {
      const matchIndex = messages.findIndex((msg) =>
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchIndex !== -1) {
        const filtered = messages.slice(matchIndex);
        setFilteredMessages(filtered);
      } else {
        setFilteredMessages([]);
      }
    } else {
      setFilteredMessages(messages);
    }
  }, [searchTerm, messages]);

  const connect = useCallback(() => {
    if (!currentChat || !currentChat.roomId) return;

    const socket = new SockJS("http://localhost:9000/stomp/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(
          `/sub/chat/room/${currentChat.roomId}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          }
        );
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers["message"]}`);
        console.error(`Additional details: ${frame.body}`);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket closed:", event);
      },
      onWebSocketError: (event) => {
        console.log("WebSocket error:", event);
      },
    });
    stompClient.activate();
    setClient(stompClient);
  }, [currentChat]);

  useEffect(() => {
    if (currentChat && currentChat.roomId) {
      setMessages([]);
      connect();
    }
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [currentChat, connect]);

  const handleSend = () => {
    if (newMessage.trim() && client && client.connected) {
      const message = {
        message: newMessage,
        roomId: currentChat.roomId,
        writer: "coh",
        sendTime: new Date().toISOString(),
        empId: currentChat.myEmpId,
      };
      client.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify(message),
      });
      setNewMessage("");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:9000/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const [originalFileName, storedFileName] = response.data.split("::");
      const fileMessage = {
        message: `파일 업로드됨: ${originalFileName}`,
        roomId: currentChat.roomId,
        writer: "coh",
        sendTime: new Date().toISOString(),
        empId: currentChat.myEmpId,
        fileUrl: `http://localhost:9000/file/download/${storedFileName}`,
        fileName: originalFileName,
        fileType: file.type,
      };

      client.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify(fileMessage),
      });
    } catch (error) {
      console.error("파일 업로드 실패:", error);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const handleLeave = () => {
    if (client) {
      client.deactivate();
    }
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
      <Box display="flex" alignItems="center" mb={2}>
        <Box ml={2}>
          <Typography variant="h6">{currentChat.name}</Typography>
        </Box>
        <Box ml="auto" display="flex" alignItems="center">
          {searchOpen ? (
            <TextField
              variant="outlined"
              placeholder="메시지 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setSearchOpen(false)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchOpen(false)}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <IconButton onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </IconButton>
          )}
          <IconButton
            variant="contained"
            color="secondary"
            onClick={handleLeave}
          >
            닫기
          </IconButton>
        </Box>
      </Box>
      <Box flex={1} style={{ overflowY: "auto" }}>
        <Box>
          {messages.map((message, index) => (
            <Box
              key={index}
              my={2}
              display="flex"
              justifyContent={
                message.empId === currentChat.myEmpId
                  ? "flex-end"
                  : "flex-start"
              }
            >
              <Paper
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    message.empId === currentChat.myEmpId
                      ? "#DCF8C6"
                      : "#FFFFFF",
                }}
              >
                <Typography variant="body1">
                  {message.message}
                  {message.fileUrl &&
                    (message.fileType &&
                    message.fileType.startsWith("image/") ? (
                      <img
                        src={message.fileUrl}
                        alt="uploaded file"
                        style={{ maxWidth: "100%" }}
                      />
                    ) : (
                      <a href={message.fileUrl} download>
                        다운로드
                      </a>
                    ))}
                </Typography>
              </Paper>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ alignSelf: "center", marginLeft: "8px" }}
              >
                {new Date(message.sendTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
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
        <input
          accept="*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <AttachFileIcon />
          </IconButton>
        </label>
      </Box>
    </Paper>
  ) : (
    <Typography variant="h6" color="textSecondary" style={{ margin: "auto" }}>
      채팅방을 선택하세요.
    </Typography>
  );
};

export default ChatWindow;
