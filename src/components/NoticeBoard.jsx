import React, { useState } from "react";
import {
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const NoticeBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate("/notice/write");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const renderPosts = currentPosts.map((post, index) => (
    <tr key={index}>
      <th scope="row">{post.id}</th>
      <td>{post.title}</td>
      <td>{post.author}</td>
      <td>{post.date}</td>
      <td>{post.views}</td>
      <td>{post.likes}</td>
    </tr>
  ));

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container mt-5">
      <h1>사내 공지</h1>
      <Button color="primary" onClick={handleWriteClick}>
        새 글쓰기
      </Button>
      <Table hover className="mt-3">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>{renderPosts}</tbody>
      </Table>
      <Pagination aria-label="Page navigation">
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i} active={i + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
};

export default NoticeBoard;
