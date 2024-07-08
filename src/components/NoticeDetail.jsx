import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NoticeDetail.css";

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/notices/${id}`
        );
        setNotice(response.data);

        // 조회수 증가 API 호출
        await axios.post(`http://localhost:9000/api/notices/hits/${id}`);
      } catch (error) {
        console.error("There was an error fetching the notice!", error);
      }
    };

    fetchNotice();
  }, [id]);

  const handleEdit = () => {
    navigate(`/notice/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/notices/delete/${id}`, {
        params: { accountId: "admin", accountPw: "1234" },
      });
      navigate("/notice");
    } catch (error) {
      console.error("There was an error deleting the notice!", error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:9000/api/notices/good/${id}`);
      setNotice((prevNotice) => ({
        ...prevNotice,
        noticeGood: (prevNotice.noticeGood || 0) + 1,
      }));
    } catch (error) {
      console.error("There was an error liking the notice!", error);
    }
  };

  const handleBack = () => {
    navigate("/notice");
  };

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notice-detail">
      <h1>{notice.noticeTitle}</h1>
      <div className="notice-meta">
        <span>
          {new Date(
            notice.noticeUpdatedAt || notice.noticeCreatedAt
          ).toLocaleDateString()}
        </span>
      </div>
      {notice.files && notice.files.length > 0 && (
        <div className="notice-files">
          {notice.files.map((file) => (
            <div key={file.fileId}>
              <a
                href={`http://localhost:9000/uploads/${file.filePath}`}
                download
              >
                {file.fileName}
              </a>
            </div>
          ))}
        </div>
      )}
      <div
        className="notice-content"
        dangerouslySetInnerHTML={{ __html: notice.noticeContent }}
      />
      <button onClick={handleEdit} className="btn btn-primary">
        수정
      </button>
      <button onClick={handleDelete} className="btn btn-danger">
        삭제
      </button>
      <button onClick={handleLike} className="btn btn-success">
        좋아요 {notice.noticeGood}
      </button>
      <button onClick={handleBack} className="btn btn-secondary">
        뒤로가기
      </button>
    </div>
  );
};

export default NoticeDetail;
