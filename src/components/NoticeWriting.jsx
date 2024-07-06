import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

const NoticeWriting = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      content,
      author: "작성자 이름",
      date: new Date().toISOString().split("T")[0],
      views: 0,
      likes: 0,
    };
    addPost(newPost);
    navigate("/notice");
  };

  return (
    <Container>
      <h1>새 공지 작성</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">제목</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">내용</Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          저장
        </Button>
      </Form>
    </Container>
  );
};

export default NoticeWriting;
