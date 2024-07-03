import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NoticeBoard = () => {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const toggle = () => setModal(!modal);

  const handleSave = () => {
    setPosts([...posts, content]);
    setContent("");
    toggle();
  };

  return (
    <div>
      <h1>사내 공지 게시판</h1>
      <Button color="primary" onClick={toggle}>
        글쓰기
      </Button>
      <ListGroup className="mt-3">
        {posts.map((post, index) => (
          <ListGroupItem key={index}>
            <div dangerouslySetInnerHTML={{ __html: post }} />
          </ListGroupItem>
        ))}
      </ListGroup>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>글쓰기</ModalHeader>
        <ModalBody>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            저장
          </Button>
          <Button color="secondary" onClick={toggle}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NoticeBoard;
