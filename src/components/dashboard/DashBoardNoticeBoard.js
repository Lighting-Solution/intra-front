import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillMegaphoneFill } from "react-icons/bs"; // Importing the icon
import { FaHeart } from "react-icons/fa"; // Importing the FaHeart icon
import "./DashBoardNoticeBoard.css"; // 대시보드 스타일을 위한 CSS 파일

const DashboardNoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/notices");
        setNotices(response.data.slice(0, 5)); // 공지사항 리스트를 5개로 제한
      } catch (error) {
        console.error("There was an error fetching the notices!", error);
      }
    };

    fetchNotices();
  }, []);

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

  return (
    <div className="dashboard-board-content">
      <h1>사내 공지</h1>
      <div className="dashboard-board-list">
        {/* 공지사항 목록 출력 */}
        {notices.map((notice, index) => (
          <div key={notice.noticePostId} className="dashboard-board-item">
            <div className="dashboard-board-col">
              {notice.importantNotice ? (
                <BsFillMegaphoneFill style={{ color: "orange" }} />
              ) : (
                index + 1
              )}
            </div>
            <div className="dashboard-board-col dashboard-board-title">
              {notice.noticeTitle || "N/A"}
            </div>
            <div className="dashboard-board-col">
              {formatDateTime(
                notice.noticeUpdatedAt || notice.noticeCreatedAt
              ) || "N/A"}
            </div>
            <div className="dashboard-board-col">{notice.noticeHits || 0}</div>
            <div className="dashboard-board-col">
              <FaHeart style={{ color: "red", marginRight: "5px" }} />
              {notice.noticeGood || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNoticeBoard;
