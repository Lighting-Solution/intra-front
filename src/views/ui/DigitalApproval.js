import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";
import Modal from "./Modal"; // Ensure this path is correct
import PendingTable from "../../components/digitalApproval/PendingTable"; // Ensure this path is correct
import RejectedTable from "../../components/digitalApproval/RejectedTable"; // Ensure this path is correct
import "./DigitalApproval.css";

const DigitalApproval = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [empId, setEmpId] = useState(localStorage.getItem("empId"));
  const [positionId, setPositionId] = useState(
    localStorage.getItem("positionId")
  );

  useEffect(() => {
    if (htmlContent) {
      const container = document.getElementById("html-content-container");

      const handleInputChange = (event) => {
        const input = event.target;
        input.setAttribute("value", input.value);
      };

      const handleTextareaChange = (event) => {
        const textarea = event.target;
        textarea.innerHTML = textarea.value;
      };

      const inputs = container.querySelectorAll("input");
      inputs.forEach((input) => {
        input.addEventListener("input", handleInputChange);
      });

      const textareas = container.querySelectorAll("textarea");
      textareas.forEach((textarea) => {
        textarea.addEventListener("input", handleTextareaChange);
      });

      return () => {
        inputs.forEach((input) => {
          input.removeEventListener("input", handleInputChange);
        });
        textareas.forEach((textarea) => {
          textarea.removeEventListener("input", handleTextareaChange);
        });
      };
    }
  }, [htmlContent]);

  const handleButtonClick = async (status) => {
    setStatus(status);
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/lighting_solutions/digital/approval/form?status=${status}`,
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setHtmlContent(response.data);
    } catch (error) {
      console.error("Error fetching the HTML content", error);
    }
  };

  const approvalRequest = async (status) => {
    try {
      const container = document.getElementById("html-content-container");

      const htmlHeadContent = `
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
        <style>
          @page {
            size: 270mm 350mm;
            margin: 20mm;
          }
          body {
            font-family: 'Noto Sans KR', sans-serif;
          }
          .tbl_outer {
            width: 800px;
            margin: 0 auto;
            border-collapse: collapse;
            background-color: white;
          }
          .tbl_inner {
            margin-top: 10px;
            width: 300px;
            border: 1px solid black;
            border-collapse: collapse;
            background-color: white;
          }
          .header_cell {
            width: 300px;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;
            padding: 3px;
            height: 90px;
            border: 1px solid black;
          }
          .content_cell {
            width: 200px;
            padding: 3px;
            height: 22px;
            vertical-align: middle;
            border: 1px solid black;
            text-align: left;
          }
          .title_cell {
            width: 100px;
            padding: 3px;
            height: 22px;
            vertical-align: middle;
            border: 1px solid black;
            text-align: center;
            font-weight: bold;
            background-color: #ddd;
          }
          .sign_type1 {
            margin-top: 10px;
            display: inline-block;
            font-size: 12px;
            padding: 0;
            background-color: white;
          }
          .tb_sign_type1 {
            border: 1px solid #000;
            border-spacing: 0;
            border-collapse: collapse;
            width: 60px;
            padding: 0;
          }
          .sign_member {
            border-bottom: 1px solid black;
            border-collapse: collapse;
            padding: 0;
            border-spacing: 0;
            width: 60px;
            font-size: 12px;
          }
          .sign_rank,
          .sign_stamp,
          .sign_name {
            border-bottom: 1px solid black;
            border-collapse: collapse;
            display: block;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 70px;
            font-size: 12px;
            padding: 0 4px;
          }

          .sign_date {
            border: none;
            border-collapse: collapse;
            display: block;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 70px;
            font-size: 12px;
            padding: 0 4px;
          }
          .stamp_approved img {
            width: auto;
            height: 40px;
          }
          .reason_cell {
            width: 300px;
            padding: 3px;
            vertical-align: middle;
            border: 1px solid black;
            text-align: left;
          }
          .tb_sign_type1 th {
            background-color: #ddd;
            text-align: center;
            padding: 5px;
            border: 1px solid #000;
          }
          .tb_sign_type1 tbody {
            border-collapse: collapse;
            border: 1px solid #000;
          }
          .sign_type1 > table {
            border: 1px solid #000;
          }
          textarea {
            width: 100%;
            height: 500px;
            box-sizing: border-box;
            resize: none;
            border: none;
            padding: 5px;
            font-family: 'Malgun Gothic', Dotum, Arial, Tahoma;
            font-size: 12px;
          }
        </style>
      `;

      const serializer = new XMLSerializer();
      const htmlBodyContent = serializer.serializeToString(container);
      const htmlContent = `<html><head>${htmlHeadContent}</head><body>${htmlBodyContent}</body></html>`;
      const encodedHtmlContent = encodeURIComponent(htmlContent);

      const response = await axios.post(
        "http://localhost:9000/api/v1/lighting_solutions/digital/approval/request",
        {
          html: encodedHtmlContent,
          status: status,
          empId: empId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );

      console.log("Success:", response.data);
      // 여기다가 화면 리로드 기능
      window.location.replace("/");
    } catch (error) {
      console.error("Error sending the HTML content", error);
    }

    window.location.reload();
  };

  const handleNewApproval = () => {
    setIsModalOpen(true);
  };

  const handleFileSelect = (type) => {
    setIsModalOpen(false);
    const typeMapping = {
      draft: 0,
      meeting: 1,
      cooperation: 2,
    };
    handleButtonClick(typeMapping[type]);
  };

  return (
    <div className="d-flex main-container">
      <div className="left-section">
        <h5>전자결재</h5>
        <Button
          className="new-approval-button"
          outline
          color="secondary"
          onClick={handleNewApproval}
        >
          새 결재 진행
        </Button>
        <div className="modal-container">
          {isModalOpen && (
            <Modal
              closeModal={() => setIsModalOpen(false)}
              onFileSelect={handleFileSelect}
            />
          )}
        </div>
      </div>
      <div className="vertical-line" />
      <div className="right-section">
        <h5>전자결재 홈</h5>
        {htmlContent ? (
          <div>
            <div
              id="html-content-container"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <Button
              className="btn"
              color="primary"
              id="approvalRequest"
              onClick={() => approvalRequest(status)}
            >
              결재 요청
            </Button>
          </div>
        ) : (
          <div className="tables-section">
            <Row>
              <Col lg="12">
                <PendingTable
                  LoginEmpId={localStorage.getItem("empId")}
                  LoginPositionId={localStorage.getItem("positionId")}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <RejectedTable
                  LoginEmpId={empId}
                  LoginPositionId={positionId}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalApproval;
