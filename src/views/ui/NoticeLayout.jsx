import React from "react";
import { Outlet } from "react-router-dom";

const NoticeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NoticeLayout;
