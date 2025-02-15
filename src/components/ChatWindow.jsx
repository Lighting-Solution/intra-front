import SearchIcon from "@mui/icons-material/Search"; // 추가
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";

const ChatWindow = ({ currentChat, setCurrentChat, testMessages }) => {
  const [messages, setMessages] = useState([]); // 현재 채팅방의 모든 메시지 저장
  const [filteredMessages, setFilteredMessages] = useState([]); // 검색어에 따라 필터링된 메시지 저장
  const [newMessage, setNewMessage] = useState(""); // 사용자가 입력한 새로운 메시지 저장
  const [searchTerm, setSearchTerm] = useState(""); // 검색 입력필드에 입력한 검색어 저장
  const [searchOpen, setSearchOpen] = useState(false); // 검색 입력 필드 열려있는지 여부
  const [client, setClient] = useState(null); //stomp 클라이언트 객체 저장 WebSocket 연결을 통해 서버와 메시지를 주고받기 위해 사용
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (testMessages) {
      setMessages(testMessages);
      setFilteredMessages(testMessages); // 초기 메시지 목록을 필터된 메시지 목록으로 설정
    }
  }, [testMessages]);

  // 검색어가 변경될 때마다 필터링된 메시지 목록을 업데이트
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

  // WebSocket 연결 설정
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
        writer: currentChat.myName,
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
  /**
   * 파일 업로드 프로세스:
  사용자가 파일을 선택하면 handleFileUpload 함수가 호출
  선택된 파일을 FormData 객체에 추가
  axios를 사용하여 파일을 서버로 전송 여기서 POST 요청을 http://localhost:9000/file/upload 엔드포인트로 보냄
  서버에서 파일이 업로드 되면 서버의 응답에서 원본 파일 이름과 저장된 파일 이름을 분리
  파일 업로드 메시지(fileMessage) 객체를 생성 후 해당 메시지를 STOMP 클라이언트를 통해 서버로 전송
   */

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; // 선택된 파일을 가져옴
    const formData = new FormData();
    formData.append("file", file); // 파일을 FormData 객체에 추가

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
        writer: currentChat.myName,
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

  // 채팅방 닫기 핸들러
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
              {message.empId !== currentChat.myEmpId && (
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    marginRight: "8px",
                    color: "#3f51b5",
                  }}
                >
                  {message.writer}
                </Typography>
              )}
              <Paper
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    message.empId === currentChat.myEmpId
                      ? "#DCF8C6"
                      : "#FFFFFF",
                }}
              >
                {/* 파일 다운로드 프로세스:
                메시지 객체에 fileUrl이 포함되어 있는 경우 파일 타입을 확인
                파일 타입이 이미지인 경우 <img> 태그를 사용하여 이미지를 렌더링
                파일 타입이 이미지가 아닌 경우 <a> 태그를 사용하여 다운로드 링크를 렌더링
                href 속성은 파일의 다운로드 URL을 뜻하고 download 속성은 파일을 다운로드하도록 한다 */}
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
                {/* 메시지 시간 불러오기 */}
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
