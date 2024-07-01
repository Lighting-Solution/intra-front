import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import axios from "axios";

import "./DigitalApproval.css";

const Tables = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [status, setStatus] = useState("");

  const handleButtonClick = async (status) => {
    setStatus(status);
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/lighting_solutions/form?status=${status}`);
      setHtmlContent(response.data);
      
    } catch (error) {
      console.error("Error fetching the HTML content", error);
    }
  };

  const approvalRequest = async (status) => {
    try {
        // Get the HTML content of the container
        const container = document.getElementById("html-content-container");

        var htmlHeadContent = `
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Login</title>
            <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 12px;
            color: black;
            margin: 0;
            padding: 20px;
        }
        .tbl_outer {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            border-collapse: collapse;
            background-color: white;
            border: 1px solid black;
        }
        .tbl_inner {
            margin-top: 10px;
            width: 100%;
            max-width: 300px;
            border: 1px solid black;
            border-collapse: collapse;
            background-color: white;
        }
        .header_cell {
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;
            padding: 10px;
            border: 1px solid black;
        }
        .content_cell {
            padding: 5px;
            vertical-align: middle;
            border: 1px solid black;
            text-align: left;
        }
        .title_cell {
            padding: 5px;
            vertical-align: middle;
            border: 1px solid black;
            text-align: center;
            font-weight: bold;
            background-color: #ddd;
        }
        .sign_type1 {
            margin-top: 10px;
            font-size: 12px;
            padding: 0;
            background-color: white;
        }
        .tb_sign_type1 {
            border: 1px solid black;
            border-collapse: collapse;
            width: 100%;
            max-width: 60px;
        }
        .sign_member {
            border-bottom: 1px solid black;
            border-collapse: collapse;
            padding: 0;
            width: 100%;
            max-width: 60px;
            font-size: 12px;
        }
        .sign_rank,
        .sign_stamp,
        .sign_name,
        .sign_date {
            border-bottom: 1px solid black;
            display: block;
            text-align: center;
            width: 100%;
            max-width: 70px;
            font-size: 12px;
            padding: 2px 4px;
        }
        .stamp_approved img {
            width: auto;
            height: 40px;
        }
        .reason_cell {
            padding: 5px;
            vertical-align: middle;
            border: 1px solid black;
            text-align: left;
        }
        .tb_sign_type1 th {
            background-color: #ddd;
            text-align: center;
            padding: 5px;
        }
        .tb_sign_type1 tbody {
            border-collapse: collapse;
            border: 1px solid black;
        }
        .sign_type1 > table {
            border: none;
        }
        textarea {
            width: 100%;
            height: 500px;
            box-sizing: border-box;
            resize: none;
            border: none;
            padding: 5px;
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 12px;
        }
        #meeting_title {
            width: 100%;
            height: 26px;
            padding: 3px;
            box-sizing: border-box;
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 12px;
            border: 1px solid black;
        }
    </style>
        `;

        // Serialize the container's HTML content
        const serializer = new XMLSerializer();
        const htmlBodyContent = serializer.serializeToString(container);

        const htmlContent = `<html><head>${htmlHeadContent}</head><body>${htmlBodyContent}</body></html>`;

        // URL encoding
        const encodedHtmlContent = encodeURIComponent(htmlContent);

        // Send the encoded HTML content to the server
        const response = await axios.post('http://localhost:9000/api/v1/lighting_solutions/approval/request', {
            html: encodedHtmlContent,
            status: status
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle the response
        console.log('Success:', response.data);
    } catch (error) {
        console.error("Error sending the HTML content", error);
    }
};

  return (
    <div className="d-flex">
      <div className="mainContent flex-grow-1">
        {!htmlContent && (
          <>
            <Button
              className="btn"
              color="primary"
              onClick={() => handleButtonClick(0)}
            >
              기안문
            </Button>
            <Button
              className="btn"
              color="primary"
              onClick={() => handleButtonClick(1)}
            >
              회의록
            </Button>
            <Button
              className="btn"
              color="primary"
              onClick={() => handleButtonClick(2)}
            >
              협조문
            </Button>
          </>
        )}
        {htmlContent ? (
          <div>
            <div id="html-content-container" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <Button className="btn" color="primary" onClick={() => approvalRequest(status)}>
              결재 요청
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Tables;
