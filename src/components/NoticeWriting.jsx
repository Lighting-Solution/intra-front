import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NoticeWriting.css";

const NoticeWriting = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "noticePostDTO",
      new Blob(
        [
          JSON.stringify({
            noticeTitle: title,
            noticeContent: content,
            importantNotice: isNotice,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/api/notices/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/notice");
    } catch (error) {
      console.error("There was an error creating the notice!", error);
    }
  };

  const handleCancel = () => {
    navigate("/notice");
  };

  return (
    <div className="notice-writing">
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="toBoard">To</label>
          <div id="toBoard" className="form-control-static">
            사내 공지
          </div>
        </div>
        <div className="separator"></div>
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
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
              }}
              className="ckeditor"
            />
          </div>
        </div>
        <div className="separator"></div>
        <div className="form-group">
          <label htmlFor="file">파일 업로드</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="separator"></div>
        <div className="settings-group">
          <div className="form-group notice-checkbox-group">
            <label>공지로 등록</label>
            <input
              type="checkbox"
              checked={isNotice}
              onChange={() => setIsNotice(!isNotice)}
            />
            등록하기
          </div>
        </div>
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

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("file", file);

          axios
            .post("http://localhost:9000/api/files/upload", data)
            .then((response) => {
              resolve({
                default: `http://localhost:9000/uploads/${response.data}`,
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }

  abort() {
    // Handle aborting the upload if necessary
  }
}

export default NoticeWriting;
