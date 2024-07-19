import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "./FreePostEditing.css";

const FreePostEditing = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingPost, setExistingPost] = useState(null);
  const navigate = useNavigate();

  // 로그인된 사용자의 정보로 설정
  const accountId = "kang"; // 실제 로그인된 사용자의 accountId로 설정
  const accountPw = "1234"; // 실제 로그인된 사용자의 accountPw로 설정

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/freeposts/${id}`)
      .then((response) => {
        const post = response.data;
        setTitle(post.freePostTitle);
        setContent(post.freePostContent);
        setExistingPost(post); // 기존 게시글 데이터를 저장
      })
      .catch((error) => {
        console.error("There was an error fetching the post!", error);
      });
  }, [id]);

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
      freePostId: id,
      freePostTitle: title,
      freePostContent: content,
      freePostHits: existingPost.freePostHits, // 기존 조회수 유지
      freePostGood: existingPost.freePostGood, // 기존 좋아요 수 유지
    };

    try {
      const response = await axios.put(
        `http://localhost:9000/api/freeposts/update/${id}?accountId=${accountId}&accountPw=${accountPw}`,
        freePostDTO
      );
      console.log(response.data);
      navigate(`/freeboard/${id}`);
    } catch (error) {
      console.error("There was an error updating the post!", error);
    }
  };

  const handleCancel = () => {
    navigate(`/freeboard/${id}`);
  };

  return (
    <div className="freepost-writing">
      <h1>수정하기</h1>
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
            수정
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

export default FreePostEditing;
