import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import MyCalendar from "../components/Calendar";
import DashboardNoticeBoard from "../components/dashboard/DashBoardNoticeBoard";
import "./Starter.css";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import Menu from "../components/dashboard/Menu";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  const [memos, setMemos] = useState(["", "", "", ""]);
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    const storedMemos = [
      localStorage.getItem("memo1"),
      localStorage.getItem("memo2"),
      localStorage.getItem("memo3"),
      localStorage.getItem("memo4"),
    ];
    setMemos(storedMemos.map(memo => memo || ""));

    const fetchWaitingApprovals = async () => {
      try {
        const response = await fetch(`/api/v1/lighting_solutions/digital/approval/waiting`);
        if (!response.ok){
          throw new Error('Network response was not ok!!!!!');
        }
        const data = await response.json();
        setApprovals(data);
      } catch(error){
        console.error('Error fetching approvals: ', error);
      }
    };
  
    fetchWaitingApprovals();
  }, []);

  

  const handleMemoChange = (index, value) => {
    const newMemos = [...memos];
    newMemos[index] = value;
    setMemos(newMemos);
  };

  const saveMemo = (index) => {
    localStorage.setItem(`memo${index + 1}`, memos[index]);
  };

  const handleKeyPress = (index, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default newline behavior
      saveMemo(index); // Calls the save function
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h3>로그인 정보</h3>
          </div>
          <div className="profile-content">
            <p className="profile-label">사용자 이름:</p>
            <p className="profile-info">{localStorage.getItem("empName")}</p>
            <p className="profile-label">직책:</p>
            <p className="profile-info">{localStorage.getItem("departmentName")}</p>
          </div>
        </div>
      </div>
      <div className="notice-container">
        <h3>사내 공지</h3>
        <DashboardNoticeBoard />
      </div>
      <div className="memo-approval-container">
        <div className="memo-container">
          <h3>메모장</h3>
          {memos.map((memo, index) => (
            <div key={index} className="memo">
              <input
                type="text"
                className="memo-input"
                placeholder="메모를 입력하세요"
                value={memo}
                onChange={(e) => handleMemoChange(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(index, e)}
              />
              <button
                className="memo-button"
                onClick={() => saveMemo(index)}
              >
                저장
              </button>
            </div>
          ))}
        </div>
        <div className="approval-container">
          <h3>전자결재 대기창</h3>
          {approvals.length > 0 ? (
          <ul>
            {approvals.map((approval, index) => (
            <li key={index}>
              <div className="approval-item">
                <p><strong>제목:</strong>{approval.title}</p>
                <p><strong>작성자:</strong>{approval.writerName}</p>
                <p><strong>상태:</strong>{approval.status}</p>
                <p><strong>등록일:</strong>{approval.createAt}</p>
              </div>
            </li>
          ))}
          </ul>
          ) : (
            <p>대기중인 전자결재가 없네요...!🐙</p>
          )}
        </div>
      </div>
      <div className="menu-container">
        <h3>주간 식단표</h3>
        <Menu />
      </div>
    </div>
  );
};

export default Starter;
