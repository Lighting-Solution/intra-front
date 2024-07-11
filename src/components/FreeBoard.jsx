import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FreeBoard.css"; // Importing the CSS file for styling
import ReactPaginate from "react-paginate";
import { FaPen, FaHeart } from "react-icons/fa"; // FaHeart 아이콘 추가
import TextField from "@mui/material/TextField";

const FreeBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/freeposts");
        setPosts(response.data);
      } catch (error) {
        console.error("There was an error fetching the posts!", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredPosts = posts
    .filter((post) =>
      post.freePostTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.freePostCreateAt) - new Date(a.freePostCreateAt);
      } else {
        return new Date(a.freePostCreateAt) - new Date(b.freePostCreateAt);
      }
    });

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const offset = currentPage * postsPerPage;

  const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleWriteClick = () => {
    navigate("write");
  };

  const handlePostClick = (postId) => {
    navigate(`/freeboard/${postId}`);
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
      <h1>자유게시판</h1>
      <div className="board-controls">
        <div className="board-actions">
          <button className="icon-button" onClick={handleWriteClick}>
            <FaPen /> 새 글쓰기
          </button>
        </div>
        <div className="board-filters" style={{ marginLeft: "auto" }}>
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
            placeholder="게시글 검색"
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
            <div className="board-col">작성자</div>
            <div className="board-col">작성일</div>
            <div className="board-col">조회</div>
            <div className="board-col">좋아요</div>
          </div>
        </div>
      </div>
      <div className="fixed-list">
        <div className="board-list">
          {currentPosts.map((post, index) => (
            <div key={post.freePostId} className="board-item">
              <div className="board-col">{index + 1 + offset}</div>
              <div
                className="board-col"
                onClick={() => handlePostClick(post.freePostId)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {post.freePostTitle || "N/A"}
              </div>
              <div className="board-col">{post.empName || "N/A"}</div>
              <div className="board-col">
                {formatDateTime(
                  post.freePostCreateAt || post.freePostUpdateAt
                ) || "N/A"}
              </div>
              <div className="board-col">{post.freePostHits || 0}</div>
              <div className="board-col">
                <FaHeart style={{ color: "red", marginRight: "5px" }} />
                {post.freePostGood || 0}
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

export default FreeBoard;
