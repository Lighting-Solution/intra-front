import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAttendeeModal = ({ closeModal, onAddAttendee, calendar }) => {
  const [openFolders, setOpenFolders] = useState({
    SERVICE_BUSINESS_DIVISION: false, // 서비스 사업부
    sbd_webService: false, // 웹 서비스팀
    sbd_consultationService: false, // 상담 서비스팀
    MANAGEMENT_SUPPORT_DIVISION: false, // 관리 지원부
    msd_hello: false, // 인사팀
    msd_money: false, // 회계팀
    msd_sales: false, // 영업팀
    SOLUTION_DEVELOPMENT_DIVISION: false, // 솔루션 개발부
    sdd_development_1: false, // 개발 1팀
    sdd_development_2: false, // 개발 2팀
    sdd_engineer_1: false, // 설계 1팀
    sdd_engineer_2: false, // 설계 2팀
    sdd_design: false, // 디자인팀
  });

  const [employees, setEmployees] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/v1/lighting_solutions/participant/departments"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };
    fetchEmployees();
  }, []);

  const toggleFolder = (folder) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleSelect = async (folderKey, employeeName) => {
    try {
      let team;
      switch (folderKey) {
        case "웹 서비스팀":
          team = "sbd_webService";
          break;
        case "상담 서비스팀":
          team = "sbd_consultationService";
          break;
        case "인사팀":
          team = "msd_hello";
          break;
        case "회계팀":
          team = "msd_money";
          break;
        case "영업팀":
          team = "msd_sales";
          break;
        case "개발 1팀":
          team = "sdd_development_1";
          break;
        case "개발 2팀":
          team = "sdd_development_2";
          break;
        case "설계 1팀":
          team = "sdd_engineer_1";
          break;
        case "설계 2팀":
          team = "sdd_engineer_2";
          break;
        case "디자인팀":
          team = "sdd_design";
          break;
        default:
          console.error(`Invalid folderKey: ${folderKey}`);
          return;
      }

      const employee = employees[team].find(
        (emp) => emp.empName === employeeName
      );
      if (!employee) {
        console.error(
          `Employee '${employeeName}' not found in team '${team}'.`
        );
        return;
      }

      const participantDTO = {
        participantId: null,
        empDTO: {
          empId: employee.empId,
          empName: employee.empName,
          department: {
            departmentId: employee.department.departmentId,
            departmentName: employee.department.departmentName,
          },
        },
        calendarDTO: {
          calendarId: calendar.calendarId,
          calendarTitle: calendar.calendarTitle,
          calendarCreateAt: calendar.calendarCreateAt,
          calendarContent: calendar.calendarContent,
          calendarStartAt: calendar.calendarStartAt,
          calendarEndAt: calendar.calendarEndAt,
        },
        team: employee.department.departmentName,
        employeeName: employee.empName,
      };

      /*
      const response = await axios.post(
        "http://localhost:9000/api/v1/lighting_solutions/participant/add",
        participantDTO
      );
      */

      //console.log("Participant added successfully:", response.data);

      // 참석자 추가 함수 호출
      onAddAttendee(team, employeeName);
      closeModal();
    } catch (error) {
      console.error("Failed to add participant:", error);
      // 에러 처리 로직 추가
    }
  };

  const renderEmployees = (teamKey, teamName) => {
    const teamEmployees = employees[teamKey];
    if (!teamEmployees) return null;
    return (
      <div style={styles.fileList}>
        {teamEmployees.map((employee) => (
          <div
            key={employee.empId}
            style={styles.file}
            onClick={() => handleSelect(teamName, employee.empName)}
          >
            {employee.empName}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={closeModal}>
          X
        </button>
        <h5>참석자 추가</h5>
        <div style={styles.fileTree}>
          <div>
            <div
              style={styles.folder}
              onClick={() => toggleFolder("SERVICE_BUSINESS_DIVISION")}
            >
              {openFolders.SERVICE_BUSINESS_DIVISION ? "📂" : "📁"} 서비스
              사업부
            </div>
            {openFolders.SERVICE_BUSINESS_DIVISION && (
              <div style={styles.fileList}>
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("sbd_webService")}
                >
                  {openFolders.sbd_webService ? "📂" : "📁"} 웹 서비스팀
                </div>
                {openFolders.sbd_webService &&
                  renderEmployees("sbd_webService", "웹 서비스팀")}
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("sbd_consultationService")}
                >
                  {openFolders.sbd_consultationService ? "📂" : "📁"} 상담
                  서비스팀
                </div>
                {openFolders.sbd_consultationService &&
                  renderEmployees("sbd_consultationService", "상담 서비스팀")}
              </div>
            )}
          </div>
          <div>
            <div
              style={styles.folder}
              onClick={() => toggleFolder("MANAGEMENT_SUPPORT_DIVISION")}
            >
              {openFolders.MANAGEMENT_SUPPORT_DIVISION ? "📂" : "📁"} 관리
              지원부
            </div>
            {openFolders.MANAGEMENT_SUPPORT_DIVISION && (
              <div style={styles.fileList}>
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("msd_hello")}
                >
                  {openFolders.msd_hello ? "📂" : "📁"} 인사팀
                </div>
                {openFolders.msd_hello &&
                  renderEmployees("msd_hello", "인사팀")}
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("msd_money")}
                >
                  {openFolders.msd_money ? "📂" : "📁"} 회계팀
                </div>
                {openFolders.msd_money &&
                  renderEmployees("msd_money", "회계팀")}
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("msd_sales")}
                >
                  {openFolders.msd_sales ? "📂" : "📁"} 영업팀
                </div>
                {openFolders.msd_sales &&
                  renderEmployees("msd_sales", "영업팀")}
              </div>
            )}
          </div>
          <div>
            <div
              style={styles.folder}
              onClick={() => toggleFolder("SOLUTION_DEVELOPMENT_DIVISION")}
            >
              {openFolders.SOLUTION_DEVELOPMENT_DIVISION ? "📂" : "📁"} 솔루션
              개발부
            </div>
            {openFolders.SOLUTION_DEVELOPMENT_DIVISION && (
              <div style={styles.fileList}>
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("sdd_development_1")}
                >
                  {openFolders.sdd_development_1 ? "📂" : "📁"} 개발 1팀
                </div>
                {openFolders.sdd_development_1 &&
                  renderEmployees("sdd_development_1", "개발 1팀")}
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("sdd_development_2")}
                >
                  {openFolders.sdd_development_2 ? "📂" : "📁"} 개발 2팀
                </div>
                {openFolders.sdd_development_2 &&
                  renderEmployees("sdd_development_2", "개발 2팀")}
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("sdd_engineer_1")}
                >
                  {openFolders.sdd_engineer_1 ? "📂" : "📁"} 설계 1팀
                </div>
                {openFolders.sdd_engineer_1 &&
                  renderEmployees("sdd_engineer_1", "설계 1팀")}
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("sdd_engineer_2")}
                >
                  {openFolders.sdd_engineer_2 ? "📂" : "📁"} 설계 2팀
                </div>
                {openFolders.sdd_engineer_2 &&
                  renderEmployees("sdd_engineer_2", "설계 2팀")}
                <div
                  style={styles.folder}
                  onClick={() => toggleFolder("sdd_design")}
                >
                  {openFolders.sdd_design ? "📂" : "📁"} 디자인팀
                </div>
                {openFolders.sdd_design &&
                  renderEmployees("sdd_design", "디자인팀")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    position: "relative",
    width: 450,
    textAlign: "left",
    zIndex: 1001,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    background: "none",
    fontSize: 20,
    cursor: "pointer",
    color: "#888",
  },
  fileTree: {
    marginTop: 20,
  },
  folder: {
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  fileList: {
    marginLeft: 20,
    marginTop: 5,
    position: "relative",
  },
  file: {
    cursor: "pointer",
    fontSize: 14,
    padding: "2px 0",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  branch: {
    position: "absolute",
    top: 0,
    left: -12,
    height: "100%",
    borderLeft: "2px solid #888",
  },
  employee: {
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
  verticalLine: {
    width: 1,
    height: 10,
    backgroundColor: "#888",
    position: "absolute",
    left: -10,
    top: 8,
  },
  horizontalLine: {
    width: 10,
    height: 1,
    backgroundColor: "#888",
    position: "absolute",
    left: -10,
    top: 8,
  },
};

export default AddAttendeeModal;
