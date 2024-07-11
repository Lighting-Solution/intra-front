import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaHeart } from "react-icons/fa";
import "./FreePostDetail.css";
import CommentSection from "./CommentSection";

const FreePostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // 로그인된 사용자의 정보로 설정
  const accountId = "kang"; // 실제 로그인된 사용자의 accountId로 설정
  const accountPw = "1234"; // 실제 로그인된 사용자의 accountPw로 설정
  const loggedInUserId = 8; // 실제 로그인된 사용자의 ID

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/freeposts/${id}`
        );
        setPost(response.data);

        // 조회수 증가 API 호출
        await axios.post(`http://localhost:9000/api/freeposts/hits/${id}`);
      } catch (error) {
        console.error("There was an error fetching the post!", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    navigate(`/freeboard/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/freeposts/delete/${id}`, {
        params: { accountId, accountPw },
      });
      navigate("/freeboard");
    } catch (error) {
      console.error("There was an error deleting the post!", error);
    }
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

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:9000/api/freeposts/good/${id}`);
      setPost((prevPost) => ({
        ...prevPost,
        freePostGood: (prevPost.freePostGood || 0) + 1,
      }));
    } catch (error) {
      console.error("There was an error liking the post!", error);
    }
  };

  const handleBack = () => {
    navigate("/freeboard");
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="freepost-detail">
      <div className="freepost-header">
        <div className="freepost-actions">
          {post.empId === loggedInUserId && (
            <>
              <div className="action-item" onClick={handleEdit}>
                <FaEdit className="icon" />
                <span>수정</span>
              </div>
              <div className="action-item" onClick={handleDelete}>
                <FaTrashAlt className="icon" />
                <span>삭제</span>
              </div>
            </>
          )}
        </div>
      </div>
      <h1 className="freepost-title">{post.freePostTitle}</h1>
      <div className="freepost-meta">
        <span className="freepost-author">
          작성자: {post.empName || "N/A"}
          &nbsp;&nbsp;{" "}
          {formatDateTime(post.freePostUpdatedAt || post.freePostCreateAt) ||
            "N/A"}
        </span>
        <div className="freepost-like">
          <FaHeart className="like-icon" onClick={handleLike} title="좋아요" />
          <span className="like-count">{post.freePostGood}</span>
        </div>
      </div>
      <hr className="divider" />
      <div
        className="freepost-content"
        dangerouslySetInnerHTML={{ __html: post.freePostContent }}
      />
      <div className="freepost-footer">
        <button onClick={handleBack} className="btn btn-secondary">
          뒤로가기
        </button>
      </div>
      <hr className="divider" /> {/* 뒤로가기 버튼 아래 구분선 추가 */}
      <CommentSection postId={id} accountId={accountId} accountPw={accountPw} />
    </div>
  );
};

export default FreePostDetail;
