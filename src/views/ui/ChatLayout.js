import React from "react";
import { Container, Grid } from "@mui/material";
import ChatList from "../../components/ChatList";
import ChatWindow from "../../components/ChatWindow";

const ChatLayout = ({ setCurrentChat, currentChat }) => {
  return (
    <Container
      maxWidth="lg"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Grid container spacing={2} style={{ flex: 1 }}>
        <Grid item xs={3}>
          <ChatList setCurrentChat={setCurrentChat} currentChat={currentChat} />
        </Grid>
        <Grid item xs={9}>
          <ChatWindow
            setCurrentChat={setCurrentChat}
            currentChat={currentChat}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default ChatLayout;
