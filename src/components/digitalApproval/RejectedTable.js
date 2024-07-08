import React, { useState } from "react";
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
} from "reactstrap"; // reactstrap에서 Modal과 관련된 컴포넌트 가져오기

const ProjectTables = () => {
  const [pdfUrl, setPdfUrl] = useState(null); // PDF 파일의 URL을 저장할 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [tableData, setTableData] = useState([]);
  const [empId, setEmpId] = useState(1);
  const [digitalApprovalId, setDigitalApprovalId] = useState(0);

  const handleProjectClick = (projectName) => {
    axios
      .get(
        `http://localhost:9000/api/v1/lighting_solutions/digital/approval/get-pdf/${encodeURIComponent(
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

  const handleApprove = () => {
    // 여기에 결재 처리 로직을 추가할 수 있습니다.
    console.log("결재 처리");
    toggleModal(); // 모달 닫기
  };

  const handleReject = () => {
    // 여기에 반려 처리 로직을 추가할 수 있습니다.
    console.log("반려 처리");
    toggleModal(); // 모달 닫기
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">결재 반려 문서</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Rejected Documents
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>작성일</th>
                <th>제목</th>
                <th>기안자</th>
                <th>상태</th>
                <th>기안부서</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index}>
                  <td></td>
                  <td
                    className="border-top"
                    onClick={() => handleProjectClick(tdata.project)}
                    style={{ cursor: "pointer" }} // 클릭 가능한 스타일 적용
                  >
                    {tdata.project}
                  </td>
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td></td>
                </tr>
              ))}
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
      </Modal>
    </div>
  );
};

export default ProjectTables;
