import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "./NoticeWriting.css";

const NoticeEditing = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const [file, setFile] = useState(null);
  const [existingNotice, setExistingNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/notices/${id}`)
      .then((response) => {
        const notice = response.data;
        setTitle(notice.noticeTitle);
        setContent(notice.noticeContent);
        setIsNotice(notice.importantNotice);
        setExistingNotice(notice); // 기존 공지사항 데이터를 저장
      })
      .catch((error) => {
        console.error("There was an error fetching the notice!", error);
      });
  }, [id]);

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
            noticePostId: id,
            noticeTitle: title,
            noticeContent: content,
            importantNotice: isNotice,
            noticeHits: existingNotice.noticeHits, // 기존 조회수 유지
            noticeGood: existingNotice.noticeGood, // 기존 좋아요 수 유지
          }),
        ],
        { type: "application/json" }
      )
    );
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:9000/api/notices/update/${id}?accountId=admin&accountPw=1234`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate(`/notice/${id}`);
    } catch (error) {
      console.error("There was an error updating the notice!", error);
    }
  };

  const handleCancel = () => {
    navigate(`/notice/${id}`);
  };

  return (
    <div className="notice-writing">
      <h1>수정하기</h1>
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

export default NoticeEditing;
