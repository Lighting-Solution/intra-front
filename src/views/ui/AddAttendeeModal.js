import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAttendeeModal = ({ closeModal, onAddAttendee }) => {
  const [openFolders, setOpenFolders] = useState({
    SERVICE_BUSINESS_DIVISION: false,
    sbd_webService: false,
    sbd_consultationService: false,
    MANAGEMENT_SUPPORT_DIVISION: false,
    msd_hello: false,
    msd_money: false,
    msd_sales: false,
    SOLUTION_DEVELOPMENT_DIVISION: false,
    sdd_development_1: false,
    sdd_development_2: false,
    sdd_engineer_1: false,
    sdd_engineer_2: false,
    sdd_design: false,
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
        case "sbd_webService":
          team = "sbd_webService";
          break;
        case "sbd_consultationService":
          team = "sbd_consultationService";
          break;
        case "msd_hello":
          team = "msd_hello";
          break;
        case "msd_money":
          team = "msd_money";
          break;
        case "msd_sales":
          team = "msd_sales";
          break;
        case "sdd_development_1":
          team = "sdd_development_1";
          break;
        case "sdd_development_2":
          team = "sdd_development_2";
          break;
        case "sdd_engineer_1":
          team = "sdd_engineer_1";
          break;
        case "sdd_engineer_2":
          team = "sdd_engineer_2";
          break;
        case "sdd_design":
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
        empDTO: {
          empId: employee.empId,
          empName: employee.empName,
          // Include other empDTO fields as needed
        },
        calendarDTO: {
          // Ensure calendarDTO is populated correctly
          // For example, if it requires an id or calendarId
          // calendarId: 'your_calendar_id',
        },
        team: team,
        employeeName: employeeName,
      };

      const response = await axios.post(
        "http://localhost:9000/api/v1/lighting_solutions/participant/add",
        participantDTO
      );

      console.log("Participant added successfully:", response.data);

      onAddAttendee(team, employeeName);
      closeModal();
    } catch (error) {
      console.error("Failed to add participant:", error);
      // Handle error (e.g., show error message to user)
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
            onClick={() => handleSelect(teamKey, employee.empName)}
          >
            <div style={styles.verticalLine}></div>
            <div style={styles.horizontalLine}></div>
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
                  renderEmployees("sbd_webService", "Web Service Team")}
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
