import { Col, Row } from "reactstrap";
import ProjectTables from "../components/dashboard/ProjectTable";
import Menu from "../components/dashboard/Menu";
import MyCalendar from "../components/Calendar";
import DashboardNoticeBoard from "../components/dashboard/DashBoardNoticeBoard"; // DashboardNoticeBoard 컴포넌트 가져오기
import "./Starter.css"; // CSS 파일 추가

const Starter = () => {
  return (
    <div>
      {/***Notice Board & Calendar ***/}
      <Row>
        <Col sm="6" lg="8">
          <div className="dashboard-noticeboard">
            <DashboardNoticeBoard />
          </div>
        </Col>
        <Col sm="6" lg="4">
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
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
