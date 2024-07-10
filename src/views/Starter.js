import React from "react";
import { Col, Row } from "reactstrap";
import Menu from "../components/dashboard/Menu";
import DashboardNoticeBoard from "../components/dashboard/DashBoardNoticeBoard"; // DashboardNoticeBoard 컴포넌트 가져오기
import "./Starter.css"; // CSS 파일 추가

const Starter = () => {
  return (
    <div>
      {/***Notice Board & Calendar ***/}
      <Row>
        <Col sm="12" lg="8">
          <div className="dashboard-noticeboard">
            <DashboardNoticeBoard />
          </div>
        </Col>
        <Col sm="12" lg="4">
          <div className="calendar-container">
            <MyCalendar />
          </div>
        </Col>
      </Row>
      {/***Menu ***/}
      <Row>
        <Col lg="12">
          <Menu />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
