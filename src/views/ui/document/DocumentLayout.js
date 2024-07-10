// DocumentLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const DocumentLayout = () => {
  return (
    <div>
      <h1>문서함</h1>
      <Outlet />
    </div>
  );
};

export default DocumentLayout;
