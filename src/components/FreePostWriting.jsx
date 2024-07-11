import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NoticeWriting.css";

const FreePostWriting = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState(""); // 작성자 이름 상태 추가
  const navigate = useNavigate();

  // 로그인된 사용자의 정보로 설정
  const accountId = "kang"; // 실제 로그인된 사용자의 accountId로 설정
  const accountPw = "1234"; // 실제 로그인된 사용자의 accountPw로 설정

  useEffect(() => {
    // 로그인된 사용자의 정보를 가져옴
    const fetchWriterInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/freeposts/emps`,
          {
            params: { accountId, accountPw },
          }
        );
        setWriter(response.data.empName); // 작성자 이름 상태 설정
      } catch (error) {
        console.error("There was an error fetching the writer info!", error);
      }
    };

    fetchWriterInfo();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const freePostDTO = {
      freePostTitle: title,
      freePostContent: content,
      freePostWriter: writer, // 작성자 이름 사용
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/freeposts/create",
        freePostDTO,
        {
          params: { accountId, accountPw },
        }
      );
      console.log(response.data);
      navigate("/freeboard");
    } catch (error) {
      console.error("There was an error creating the post!", error);
    }
  };

  const handleCancel = () => {
    navigate("/freeboard");
  };

  return (
    <div className="freepost-writing">
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="writer">작성자</label>
          <input
            type="text"
            id="writer"
            value={writer}
            className="form-control"
            readOnly
          />
        </div>
        <div className="separator"></div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <div className="ckeditor-container">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={handleContentChange}
              className="ckeditor"
            />
          </div>
        </div>
        <div className="separator"></div>
        <div className="form-group button-group">
          <button type="submit" className="btn btn-primary">
            등록
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default FreePostWriting;
