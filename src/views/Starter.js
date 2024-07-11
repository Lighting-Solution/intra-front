import React from "react";
import { Col, Row } from "reactstrap";
import MyCalendar from "../components/Calendar";
import DashboardNoticeBoard from "../components/dashboard/DashBoardNoticeBoard"; // DashboardNoticeBoard 컴포넌트 가져오기
import "./Starter.css"; // CSS 파일 추가
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
  return (
    <div className="dashboard-grid">
      <div className="profile-container">
        <h3>로그인 정보</h3>
        <p>사용자 이름: 홍길동</p>
        <p>직책: 관리자</p>
      </div>
      <div className="notice-container">
        <h3>사내 공지</h3>
        <DashboardNoticeBoard />
      </div>
      <div className="memo-approval-container">
        <div className="memo-container">
          <h3>메모장</h3>
          <textarea
            className="memo-area"
            placeholder="메모를 입력하세요"
          ></textarea>
        </div>
        <div className="approval-container">
          <h3>전자결재 대기창</h3>
          <ul>
            <li>결재 1</li>
            <li>결재 2</li>
            <li>결재 3</li>
            <li>결재 4</li>
          </ul>
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
