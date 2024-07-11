import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentSection.css";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  const empId = localStorage.getItem("empId");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/freeposts/${postId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("There was an error fetching the comments!", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      const response = await axios.post(
        `http://localhost:9000/api/freeposts/${postId}/comments`,
        { freeCommentContent: newComment },
        {
          params: { empId },
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("There was an error adding the comment!", error);
    }
  };

  const handleEditCommentChange = (e) => {
    setEditCommentContent(e.target.value);
  };

  const handleEditComment = async () => {
    if (!editCommentContent) return;
    try {
      const response = await axios.put(
        `http://localhost:9000/api/freeposts/${postId}/comments/${editCommentId}`,
        { freeCommentContent: editCommentContent },
        {
          params: { empId },
        }
      );
      setComments(
        comments.map((comment) =>
          comment.freeCommentId === editCommentId ? response.data : comment
        )
      );
      setEditCommentId(null);
      setEditCommentContent("");
    } catch (error) {
      console.error("There was an error editing the comment!", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/freeposts/${postId}/comments/${commentId}`,
        {
          params: { empId },
        }
      );
      setComments(
        comments.filter((comment) => comment.freeCommentId !== commentId)
      );
    } catch (error) {
      console.error("There was an error deleting the comment!", error);
    }
  };

  const startEditing = (commentId, content) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
  };

  return (
    <div className="comment-section">
      <h2>댓글</h2>
      <div className="new-comment">
        <textarea
          value={newComment}
          onChange={handleNewCommentChange}
          placeholder="댓글을 입력하세요"
        />
        <button className="add-comment-button" onClick={handleAddComment}>
          댓글 등록
        </button>
      </div>
      <hr className="divider" />
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.freeCommentId} className="comment">
            <div className="comment-content">
              <span>
                {comment.empName}
                {"    "}
                {comment.freeCommentUpdatedAt ? " " : "   "}
                {new Date(
                  comment.freeCommentUpdatedAt || comment.freeCommentCreateAt
                ).toLocaleString()}
              </span>
              <p>{comment.freeCommentContent}</p>
            </div>
            {comment.empId === parseInt(empId) && (
              <div className="comment-actions">
                <button
                  className="edit-button"
                  onClick={() =>
                    startEditing(
                      comment.freeCommentId,
                      comment.freeCommentContent
                    )
                  }
                >
                  <span className="icon">✏️</span>
                  수정
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteComment(comment.freeCommentId)}
                >
                  <span className="icon">🗑️</span>
                  삭제
                </button>
              </div>
            )}
            {editCommentId === comment.freeCommentId && (
              <div className="edit-comment">
                <textarea
                  value={editCommentContent}
                  onChange={handleEditCommentChange}
                />
                <button onClick={handleEditComment}>수정 완료</button>
              </div>
            )}
            <hr className="divider" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
