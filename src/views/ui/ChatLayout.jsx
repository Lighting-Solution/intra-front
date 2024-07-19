import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ChatList from "../../components/Chat/ChatList";
import ChatWindow from "../../components/Chat/ChatWindow";

const ChatLayout = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [testMessages, setTestMessages] = useState([]);

  useEffect(() => {
    // testMessages가 변경될 때 messages 상태를 업데이트

    setTestMessages(testMessages);
    console.log("ChatLayout의 testMassages :", testMessages);
  }, [testMessages]);

  return (
    <Container
      maxWidth="lg"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Grid container spacing={2} style={{ flex: 1 }}>
        <Grid item xs={3}>
          <ChatList
            setCurrentChat={setCurrentChat}
            currentChat={currentChat}
            setTestMessages={setTestMessages}
          />
        </Grid>
        <Grid item xs={9}>
          <ChatWindow
            setCurrentChat={setCurrentChat}
            currentChat={currentChat}
            testMessages={testMessages}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatLayout;
