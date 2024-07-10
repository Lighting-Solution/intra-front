import { Col, Row } from "reactstrap";
import Menu from "../components/dashboard/Menu";
import MyCalendar from "../components/Calendar";
import DashboardNoticeBoard from "../components/dashboard/DashBoardNoticeBoard"; // DashboardNoticeBoard 컴포넌트 가져오기
import "./Starter.css"; // CSS 파일 추가
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
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
      {/* Add Menu */}
      <Row>
        <Col lg="12">
          <Menu />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
