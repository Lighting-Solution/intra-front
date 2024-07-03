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

  // WebSocket 연결 설정
  const connect = useCallback(() => {
    if (!currentChat || !currentChat.id) return;

    const socket = new SockJS("http://localhost:9000/stomp/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/sub/chat/room/${currentChat.id}`, (message) => {
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
    if (currentChat && currentChat.id) {
      setMessages([]);
      connect();
      // fetchMessages(currentChat.id); // 채팅방 메시지 불러오기
    }
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [currentChat, connect, client]);

  // 메시지 목록을 API로부터 불러오는 함수
  // const fetchMessages = async (roomId) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9000/api/rooms/${roomId}/messages`
  //     );
  //     setMessages(response.data);
  //     console.log(messages);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };

  // 메시지 전송 핸들러
  const handleSend = () => {
    if (newMessage.trim() && client && client.connected) {
      const message = {
        content: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString(),
        roomMember: {
          room: {
            roomId: currentChat.id,
          },
        },
      };
      client.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify(message),
      });
      setNewMessage("");
    }
  };

  // 채팅방 나가기 핸들러
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
      <Box flex={1} style={{ overflowY: "auto" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={currentChat.avatar} />
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
          {testMessages.map((testMessages, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                testMessages.empId === 1 ? "flex-end" : "flex-start"
              }
            >
              <Paper
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    testMessages.empId === 1 ? "#DCF8C6" : "#FFFFFF", //1은 하드코딩한값
                }}
              >
                <Typography variant="body1">{testMessages.message}</Typography>
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
