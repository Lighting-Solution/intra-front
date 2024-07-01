import React, { useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";

import './DigitalApproval.css';

const Tables = () => {
  const [htmlContent, setHtmlContent] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/lighting_solutions/getHtmlContent");
      setHtmlContent(response.data);
    } catch (error) {
      console.error("Error fetching the HTML content", error);
    }
  };

  return (
    <div className="d-flex">
      <div className="mainContent flex-grow-1">
        {!htmlContent && (
          <Button className="btn" color="primary" onClick={handleButtonClick}>
            Load form2
          </Button>
        )}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        
      </div>
    </div>
  );
};

export default Tables;
