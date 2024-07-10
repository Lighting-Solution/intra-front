import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "../components/Login/PrivateRoute.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
//Calendar 추가
const Calendar = lazy(() => import("../views/ui/Calendar.js"));

//DigitalApproval 추가
const DigitalApproval = lazy(() => import("../views/ui/DigitalApproval.js"));

//결재 대기 문서
const PendingDocuments = lazy(() => import("../views/ui/PendingDocuments.js"));

//결재 반려 문서
const RejectedDocuments = lazy(() =>
  import("../views/ui/RejectedDocuments.js")
);

// Login 페이지 추가
const Login = lazy(() => import("../views/ui/Login.js"));
/*****Routes******/

const ThemeRoutes = [
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
        path: "/digitalapproval/pending",
        exact: true,
        element: <PendingDocuments />,
      },
      {
        path: "/digitalapproval/rejected",
        exact: true,
        element: <RejectedDocuments />,
      },
    ],
  },
];

export default ThemeRoutes;
