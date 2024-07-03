import React, { useState } from "react";

const Modal = ({ closeModal, onFileSelect }) => {
  const [openFolders, setOpenFolders] = useState({
    general: false,
    support: false,
    expenditure: false,
    hr: false,
    leave: false,
  });

  const toggleFolder = (folder) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleCreate = (type) => {
    onFileSelect(type);
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={closeModal}>
          X
        </button>
        <h5>결재양식 선택</h5>
        <div style={styles.fileTree}>
          <div>
            <div style={styles.folder} onClick={() => toggleFolder("general")}>
              {openFolders.general ? "📂" : "📁"} 일반
            </div>
            {openFolders.general && (
              <div style={styles.fileList}>
                <div style={styles.branch}></div>
                <div style={styles.file} onClick={() => handleCreate("draft")}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>기안문
                </div>
                <div
                  style={styles.file}
                  onClick={() => handleCreate("meeting")}
                >
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>회의록
                </div>
                <div
                  style={styles.file}
                  onClick={() => handleCreate("cooperation")}
                >
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>협조문
                </div>
              </div>
            )}
          </div>
          <div>
            <div style={styles.folder} onClick={() => toggleFolder("support")}>
              {openFolders.support ? "📂" : "📁"} 지원
            </div>
            {openFolders.support && (
              <div style={styles.fileList}>
                <div style={styles.branch}></div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>지원파일1
                </div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>지원파일2
                </div>
              </div>
            )}
          </div>
          <div>
            <div
              style={styles.folder}
              onClick={() => toggleFolder("expenditure")}
            >
              {openFolders.expenditure ? "📂" : "📁"} 지출결의
            </div>
            {openFolders.expenditure && (
              <div style={styles.fileList}>
                <div style={styles.branch}></div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>지출결의파일1
                </div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>지출결의파일2
                </div>
              </div>
            )}
          </div>
          <div>
            <div style={styles.folder} onClick={() => toggleFolder("hr")}>
              {openFolders.hr ? "📂" : "📁"} 인사
            </div>
            {openFolders.hr && (
              <div style={styles.fileList}>
                <div style={styles.branch}></div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>인사파일1
                </div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>인사파일2
                </div>
              </div>
            )}
          </div>
          <div>
            <div style={styles.folder} onClick={() => toggleFolder("leave")}>
              {openFolders.leave ? "📂" : "📁"} 휴가
            </div>
            {openFolders.leave && (
              <div style={styles.fileList}>
                <div style={styles.branch}></div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>휴가신청서
                </div>
                <div style={styles.file}>
                  <div style={styles.verticalLine}></div>
                  <div style={styles.horizontalLine}></div>휴일근무신청서
                </div>
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
    left: -20,
    width: 1,
    height: "100%",
    backgroundColor: "#888",
  },
  verticalLine: {
    width: 1,
    height: 20,
    backgroundColor: "#888",
    position: "absolute",
    left: -20,
    top: 0,
  },
  horizontalLine: {
    width: 20,
    height: 1,
    backgroundColor: "#888",
    position: "absolute",
    left: -20,
    top: 10,
  },
};

export default Modal;
