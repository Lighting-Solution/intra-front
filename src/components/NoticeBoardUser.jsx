import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NoticeBoardUser.css";
import ReactPaginate from "react-paginate";
import { BsFillMegaphoneFill } from "react-icons/bs"; // Importing the icon
import { FaHeart } from "react-icons/fa"; // Importing the FaHeart icon
import TextField from "@mui/material/TextField";

const NoticeBoardUser = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [sortOrder, setSortOrder] = useState("latest"); // 정렬 상태
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredNotices = notices
    .filter((notice) =>
      notice.noticeTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.noticeCreatedAt) - new Date(a.noticeCreatedAt);
      } else {
        return new Date(a.noticeCreatedAt) - new Date(b.noticeCreatedAt);
      }
    });

  const importantNotices = filteredNotices.filter(
    (notice) => notice.importantNotice
  );

  const regularNotices = filteredNotices.filter(
    (notice) => !notice.importantNotice
  );

  const totalNoticesCount = regularNotices.length;
  const pageCount = Math.ceil(
    totalNoticesCount / (noticesPerPage - importantNotices.length)
  );
  const offset = currentPage * (noticesPerPage - importantNotices.length);

  const currentNotices = [
    ...importantNotices,
    ...regularNotices.slice(
      offset,
      offset + (noticesPerPage - importantNotices.length)
    ),
  ].slice(0, noticesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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
    <div className="board-content">
      <h1>사내 공지</h1>
      <div className="board-controls">
        <div className="board-filters">
          <select
            className="filter-select"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="공지사항 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ style: { height: "40px" } }}
          />
        </div>
      </div>
      <div className="fixed-header">
        <div className="board-list">
          <div className="board-header">
            <div className="board-col">번호</div>
            <div className="board-col">제목</div>
            <div className="board-col">작성일</div>
            <div className="board-col">조회</div>
            <div className="board-col">좋아요</div>
          </div>
        </div>
      </div>
      <div className="fixed-list">
        <div className="board-list">
          {/* 공지사항 목록 출력 */}
          {currentNotices.map((notice, index) => (
            <div key={notice.noticePostId} className="board-item">
              <div className="board-col">
                {notice.importantNotice ? (
                  <BsFillMegaphoneFill style={{ color: "orange" }} />
                ) : (
                  regularNotices.indexOf(notice) + 1
                )}
              </div>
              <div
                className="board-col"
                onClick={() => navigate(`/notice/${notice.noticePostId}`)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {notice.noticeTitle || "N/A"}
              </div>
              <div className="board-col">
                {formatDateTime(
                  notice.noticeUpdatedAt || notice.noticeCreatedAt
                ) || "N/A"}
              </div>
              <div className="board-col">{notice.noticeHits || 0}</div>
              <div className="board-col">
                <FaHeart style={{ color: "red", marginRight: "5px" }} />
                {notice.noticeGood || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-container">
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
    </div>
  );
};

export default NoticeBoardUser;
