import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  CardFooter,
} from "reactstrap"; // reactstrap에서 Modal과 관련된 컴포넌트 가져오기

const PendingTable = ({ LoginEmpId, LoginPositionId }) => {
  const [pdfUrl, setPdfUrl] = useState(null); // PDF 파일의 URL을 저장할 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [tableData, setTableData] = useState([]);
  const [empId, setEmpId] = useState(LoginEmpId);
  const [positionId, setPositionId] = useState(LoginPositionId);
  const [digitalApprovalId, setDigitalApprovalId] = useState(0);

  useEffect(() => {
    console.log(empId);
    console.log(positionId);
    axios
      .get(
        "http://localhost:9000/api/v1/lighting_solutions/digital/approval/waiting",
        {
          params: {
            empId: empId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setTableData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, [LoginEmpId, LoginPositionId]);

  const handleProjectClick = (projectName, digitalApprovalId) => {
    setDigitalApprovalId(digitalApprovalId);
    axios
      .get(
        `http://localhost:9000/api/v1/lighting_solutions/digital/approval/pdf/${digitalApprovalId}/${encodeURIComponent(
          projectName
        )}`,
        {
          responseType: "blob", // 요청에 대한 응답으로 blob 데이터를 받음 (PDF 파일)
        }
      )
      .then((response) => {
        // PDF 파일을 받은 후, URL 생성하여 상태에 설정
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setPdfUrl(fileURL);
        setModalOpen(true); // 모달 열기
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen); // 모달 열기/닫기 상태 변경
    setPdfUrl(null); // 모달이 닫힐 때 PDF URL 초기화
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/lighting_solutions/digital/approval/requestpermission",
        {
          empId: empId,
          digitalApprovalId: digitalApprovalId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      console.log("empId : ====" + empId);
    } catch (error) {
      console.error("Error sending the HTML content", error);
    }

    toggleModal(); // 모달 닫기
    window.location.reload();
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/lighting_solutions/digital/approval/requestreject",
        {
          empId: empId,
          digitalApprovalId: digitalApprovalId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("currentTime : " + currentTime);
    } catch (error) {
      console.error("Error sending the HTML content", error);
    }
    const currentTime = new Date();
    toggleModal(); // 모달 닫기
    window.location.reload();
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatus = (tdata) => {
    console.log("getStatus:", {
      positionId,
      managerStatus: tdata.managerStatus,
      positionName: tdata.empDTO.position.positionName,
    });
    if (positionId >= 3) {
      return tdata.managerStatus ? "[대표이사] 결재 대기" : "[부장] 결재 대기";
    } else if (positionId == 2) {
      return tdata.managerStatus
        ? "[대표이사] 결재 대기"
        : "[" + tdata.empDTO.position.positionName + "] 결재 요청";
    } else if (positionId == 1) {
      return "최종 결재 대기";
    } else {
      return null;
    }
  };

  const renderTableRow = (tdata, index, status) => (
    <tr key={index} className="border-top">
      <td>{formatDate(tdata.digitalApprovalCreateAt)}</td>
      <td
        onClick={() =>
          handleProjectClick(tdata.project, tdata.digitalApprovalId)
        }
        style={{ cursor: "pointer" }} // Apply clickable style
      >
        {tdata.digitalApprovalName}
      </td>
      <td>
        <div className="d-flex align-items-center p-2">
          <div className="ms-3">
            <h6 className="mb-0">{tdata.empDTO.empName}</h6>
          </div>
        </div>
      </td>
      <td>
        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3 align-self-center"></span>{" "}
        {status}
      </td>
      <td>{tdata.empDTO.department.departmentName}</td>
    </tr>
  );

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">결재 대기 문서</CardTitle>
          <div>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Pending Documents
            </CardSubtitle>
          </div>
          <span className="p-2 bg-warning rounded-circle d-inline-block ms-3 align-self-center"></span>{" "}
          : 결재 대기
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>결재일</th>
                <th>제목</th>
                <th>기안자</th>
                <th>상태</th>
                <th>기안 팀</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => {
                const status = getStatus(tdata);
                console.log("Table Row:", { tdata, status, positionId, empId });

                if (!tdata.ceoStatus && !tdata.digitalApprovalType) {
                  if (positionId != 1) {
                    if (positionId == 2 && !tdata.managerStatus) {
                      return renderTableRow(tdata, index, status);
                    } else if (positionId != 2) {
                      return renderTableRow(tdata, index, status);
                    }
                  } else if (positionId == 1 && tdata.managerStatus) {
                    return renderTableRow(tdata, index, status);
                  }
                }
                return null;
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* PDF를 보여줄 Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        {" "}
        {/* 모달 크기를 큰 사이즈로 설정 */}
        <ModalHeader toggle={toggleModal}>PDF Viewer</ModalHeader>{" "}
        {/* 모달 헤더에 닫기 버튼 추가 */}
        <ModalBody>
          {pdfUrl && (
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          )}
        </ModalBody>
        {positionId < 3 && (
          <div className="modal-footer">
            <Button color="success" onClick={handleApprove}>
              결재
            </Button>{" "}
            {/* 결재 버튼 */}
            <Button color="danger" onClick={handleReject}>
              반려
            </Button>{" "}
            {/* 반려 버튼 */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingTable;
