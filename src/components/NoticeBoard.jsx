import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NoticeBoard.css"; // Importing the CSS file for styling
import ReactPaginate from "react-paginate";
import { FaPen, FaTrash, FaBullhorn } from "react-icons/fa";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const noticesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/notices");
        setNotices(response.data);
      } catch (error) {
        console.error("There was an error fetching the notices!", error);
      }
    };

    fetchNotices();
  }, []);

  const pageCount = Math.ceil(notices.length / noticesPerPage);
  const offset = currentPage * noticesPerPage;
  const currentNotices = notices.slice(offset, offset + noticesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleWriteClick = () => {
    navigate("write");
  };

  return (
    <div className="board-content">
      <h1>사내 공지</h1>
      <div className="board-controls">
        <div className="board-actions">
          <button className="icon-button" onClick={handleWriteClick}>
            <FaPen /> 새 글쓰기
          </button>
          <button className="icon-button">
            <FaTrash /> 삭제
          </button>
          <button className="icon-button">
            <FaBullhorn /> 공지로 등록
          </button>
        </div>
        <div className="board-filters">
          <select className="filter-select">
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>
          <input type="text" placeholder="검색" className="search-input" />
        </div>
      </div>
      <div className="board-list">
        <div className="board-header">
          <div className="board-col">번호</div>
          <div className="board-col">제목</div>
          <div className="board-col">작성일</div>
          <div className="board-col">조회</div>
          <div className="board-col">좋아요</div>
        </div>
        {currentNotices.map((notice, index) => (
          <div key={notice.noticePostId} className="board-item">
            <div className="board-col">{offset + index + 1}</div>
            <div
              className="board-col"
              onClick={() => navigate(`/notice/${notice.noticePostId}`)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {notice.noticeTitle || "N/A"}
            </div>
            <div className="board-col">
              {new Date(
                notice.noticeUpdatedAt || notice.noticeCreatedAt
              ).toLocaleDateString() || "N/A"}
            </div>
            <div className="board-col">{notice.noticeHits || 0}</div>
            <div className="board-col">{notice.noticeGood || 0}</div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default NoticeBoard;
