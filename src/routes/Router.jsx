import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout.js'));

/***** Pages ****/
const Starter = lazy(() => import('../views/Starter.js'));
const About = lazy(() => import('../views/About.js'));
const Alerts = lazy(() => import('../views/ui/Alerts.js'));
const Badges = lazy(() => import('../views/ui/Badges.js'));
const Buttons = lazy(() => import('../views/ui/Buttons.js'));
const Cards = lazy(() => import('../views/ui/Cards.js'));
const Grid = lazy(() => import('../views/ui/Grid.js'));
const Tables = lazy(() => import('../views/ui/Tables.js'));
const Forms = lazy(() => import('../views/ui/Forms.js'));
const Breadcrumbs = lazy(() => import('../views/ui/Breadcrumbs.js'));
const ChatLayout = lazy(() => import('../views/ui/ChatLayout.jsx'));
const NoticeBoard = lazy(() => import('../views/ui/NoticeBoard.js'));
const FreeBoard = lazy(() => import('../views/ui/FreeBoard.js'));
const Contact = lazy(() => import('../views/ui/Contact.js'));

/*****Routes******/
const ThemeRoutes = () => [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/starter' /> },
      { path: '/contact', exact: true, element: <Contact /> },
      { path: '/starter', exact: true, element: <Starter /> },
      { path: '/about', exact: true, element: <About /> },
      { path: '/alerts', exact: true, element: <Alerts /> },
      { path: '/badges', exact: true, element: <Badges /> },
      { path: '/buttons', exact: true, element: <Buttons /> },
      { path: '/cards', exact: true, element: <Cards /> },
      { path: '/grid', exact: true, element: <Grid /> },
      { path: '/table', exact: true, element: <Tables /> },
      { path: '/forms', exact: true, element: <Forms /> },
      { path: '/breadcrumbs', exact: true, element: <Breadcrumbs /> },
      {
        path: '/chat',
        exact: true,
        element: <ChatLayout />,
      },
      {
        path: '/notice',
        exact: true,
        element: <NoticeBoard />,
      },
      {
        path: '/freeboard',
        exact: true,
        element: <FreeBoard />,
      },
    ],
  },
];

export default ThemeRoutes;
