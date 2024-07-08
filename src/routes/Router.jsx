import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const ChatLayout = lazy(() => import("../views/ui/ChatLayout.jsx"));
const NoticeLayout = lazy(() => import("../views/ui/NoticeLayout.jsx"));
const DocumentLayout = lazy(() => import("../views/ui/document/DocumentLayout.js"));

/***** Pages ****/
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts.js"));
const Badges = lazy(() => import("../views/ui/Badges.js"));
const Buttons = lazy(() => import("../views/ui/Buttons.js"));
const Cards = lazy(() => import("../views/ui/Cards.js"));
const Grid = lazy(() => import("../views/ui/Grid.js"));
const Tables = lazy(() => import("../views/ui/Tables.js"));
const Forms = lazy(() => import("../views/ui/Forms.js"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs.js"));
const NoticeBoard = lazy(() => import("../components/NoticeBoard.jsx"));
const FreeBoard = lazy(() => import("../components/FreeBoard.jsx"));
const NoticeWriting = lazy(() => import("../components/NoticeWriting.jsx"));
const PrivateRoute = lazy(() => import("../components/Login/PrivateRoute.js"));
//Calendar 추가
const Calendar = lazy(() => import("../views/ui/Calendar.js"));

//DigitalApproval 추가
const DigitalApproval = lazy(() => import("../views/ui/DigitalApproval.js"));

// 결재 대기
const PendingTable = lazy(() =>
  import("../components/digitalApproval/PendingTable.js")
);

// 결재 반려
const RejectedTable = lazy(() =>
  import("../components/digitalApproval/RejectedTable.js")
);

// Login 페이지 추가
const Login = lazy(() => import("../views/ui/Login.js"));

// document 추가
const DocumentComponent = lazy(() => import("../views/ui/document/DocumentComponent.js"));
const DocumentDetail = lazy(() => import("../views/ui/document/DocumentDetail.js"))

/*****Routes******/
const ThemeRoutes = () => [
  {
    path: "/login",
    exact: true,
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<FullLayout />} />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/calendar", exact: true, element: <Calendar /> },
      { path: "/digitalapproval", exact: true, element: <DigitalApproval /> },
      {
        path: "/chat",
        exact: true,
        element: <ChatLayout />,
      },
      {
        path: "/document",
        element: <DocumentLayout />, // 새로운 DocumentLayout 사용
        children: [
          { path: "", exact: true, element: <DocumentComponent /> },
          { path: "detail/:id", exact: true, element: <DocumentDetail /> },
        ],
      },
      {
        path: "notice",
        element: <NoticeLayout />,
        children: [
          { path: "", exact: true, element: <NoticeBoard /> },
          { path: "write", exact: true, element: <NoticeWriting /> },
        ],
      },
      {
        path: "/digitalapproval/pending",
        exact: true,
        element: <PendingTable LoginEmpId={1} LoginPositionId={5} />,
      },
      {
        path: "/digitalapproval/rejected",
        exact: true,
        element: <RejectedTable LoginEmpId={1} LoginPositionId={5} />,
      },
      {
        path: "/freeboard",
        exact: true,
        element: <FreeBoard />,
      },
      
    ],
  },
];

export default ThemeRoutes;
