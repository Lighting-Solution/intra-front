import React from "react";

const FileSelection = ({ onFileSelect }) => {
  return (
    <div>
      <h3>파일 종류 선택</h3>
      <ul>
        <li onClick={() => onFileSelect("draft")}>기안문</li>
        <li onClick={() => onFileSelect("meeting")}>회의록</li>
        <li onClick={() => onFileSelect("cooperation")}>협조문</li>
      </ul>
    </div>
  );
};

export default FileSelection;
