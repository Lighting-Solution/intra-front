import React from "react";
import { Button } from "reactstrap";

const Tables = () => {
  const handleButtonClick = () => {};

  return (
    <div className="d-flex">
      {/* Main content 영역 */}
      <div className="mainContent flex-grow-1">
        <Button className="btn" color="primary" onClick={handleButtonClick}>
          Load form2
        </Button>
      </div>
    </div>
  );
};

export default Tables;
