import React from "react";
import { Col, Row } from "reactstrap";
import Menu from "../components/dashboard/Menu";
import DashboardNoticeBoard from "../components/dashboard/DashBoardNoticeBoard"; // DashboardNoticeBoard 컴포넌트 가져오기
import "./Starter.css"; // CSS 파일 추가

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
