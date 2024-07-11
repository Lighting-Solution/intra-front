import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "./NoticeDetailUser.css";

const NoticeDetailUser = () => {
  //const { id } = useParams();
  const [empId, setEmpId] = useState(null);
  const [notice, setNotice] = useState([]);
  const [nextNotices, setNextNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmpId = localStorage.getItem("empId");
    if (storedEmpId) {
      setEmpId(storedEmpId);
    }
  }, []);

  const fetchNotice = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/notices/${empId}`
      );
      console.log(response);
      console.log(notice);
      setNotice(response.data);
      // 조회수 증가 API 호출
      await axios.post(`http://localhost:9000/api/notices/hits/${empId}`);
    } catch (error) {
      console.error("There was an error fetching the notice!", error);
    }
  };

  const fetchNextNotices = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/notices");
      const currentNoticeIndex = response.data.findIndex(
        (notice) => notice.noticePostId === parseInt(empId)
      );
      const nextNotices = response.data.slice(
        currentNoticeIndex + 1,
        currentNoticeIndex + 6
      );
      setNextNotices(nextNotices);
    } catch (error) {
      console.error("There was an error fetching the next notices!", error);
    }
  };

  useEffect(() => {
    fetchNotice();
    fetchNextNotices();
  }, [empId]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    let hours = date.getHours();
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시일 경우 12시로 표시
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${ampm} ${hours}:${minutes}`;
    return formattedDateTime;
  };

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:9000/api/notices/good/${empId}`);
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

  /*
  if (!notice) {
    return <div>Loading...</div>;
  }
  */

  return (
    <>
      {notice !== null && (
        <div className="notice-detail">
          <h1>{notice.noticeTitle}</h1>
          <div className="notice-meta">
            <span>
              {formatDateTime(
                notice.noticeUpdatedAt || notice.noticeCreatedAt
              ) || "N/A"}
            </span>
          </div>
          <hr className="divider" />
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
          <div className="notice-footer">
            <button onClick={handleLike} className="btn btn-success">
              좋아요 {notice.noticeGood}
            </button>
            <button onClick={handleBack} className="btn btn-secondary">
              뒤로가기
            </button>
          </div>
          <hr className="divider" />
          {/* 다음 공지사항 5개를 표시 */}
          <div className="next-notices">
            <h2>다음 공지사항</h2>
            <div className="board-list">
              {nextNotices.map((nextNotice, index) => (
                <div
                  key={nextNotice.noticePostId}
                  className="board-item"
                  onClick={() => navigate(`/notice/${nextNotice.noticePostId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="board-col">{index + 1}</div>
                  <div className="board-col">{nextNotice.noticeTitle}</div>
                  <div className="board-col">
                    {formatDateTime(nextNotice.noticeCreatedAt)}
                  </div>
                  <div className="board-col">{nextNotice.noticeHits}</div>
                  <div className="board-col">
                    <FaHeart style={{ color: "red", marginRight: "5px" }} />
                    {nextNotice.noticeGood}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeDetailUser;
