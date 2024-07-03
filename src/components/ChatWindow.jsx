import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatWindow = ({ currentChat, setCurrentChat, testMessages }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (testMessages) {
      setMessages(testMessages);
    }
    console.log("testMessages", testMessages);
  }, [testMessages]);

  const connect = useCallback(() => {
    if (!currentChat || !currentChat.roomId) return;

    const socket = new SockJS("http://localhost:9000/stomp/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/sub/chat/room/${currentChat.roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
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
        writer: 'coh',
        empId: currentChat.myEmpId
      };
      client.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify(message),
      });
      setNewMessage("");
    }
  };

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
      <Box flex={1} style={{ overflowY: "auto" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box ml={2}>
            <Typography variant="h6">{currentChat.name}</Typography>
          </Box>
          <IconButton
            variant="contained"
            color="secondary"
            style={{ marginLeft: "auto" }}
            onClick={handleLeave}
          >
            닫기
          </IconButton>
        </Box>

        <Box>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.empId === currentChat.myEmpId ? "flex-end" : "flex-start"
              }
            >
              <Paper
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    message.empId === currentChat.myEmpId ? "#DCF8C6" : "#FFFFFF",
                }}
              >
                <Typography variant="body1">{message.message}</Typography>
              </Paper>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ alignSelf: "center", marginLeft: "8px" }}
              >
                {14}
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