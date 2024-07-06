// src/views/ui/DocumentComponent.js
import React, { useState } from 'react';
import './DocumentComponent.css';

const DocumentComponent = () => {
  const [documents, setDocuments] = useState([]);

  const handleCategoryClick = async (category) => {
    console.log(`${category} clicked`);
    try {
      const response = await fetch(`http://localhost:8080/documents?category=${category}`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  return (
    <div className="document-component">
      <div className="document-sidebar">
        <button className="document-button">문서 등록</button>
        <div className="document-categories">
          <div onClick={() => handleCategoryClick('공통')}>공통</div>
          <div onClick={() => handleCategoryClick('서비스사업부')}>서비스사업부</div>
          <div onClick={() => handleCategoryClick('관리지원부')}>관리지원부</div>
          <div onClick={() => handleCategoryClick('솔루션사업부')}>솔루션사업부</div>
          <div onClick={() => handleCategoryClick('전자결재')}>전자결재</div>
        </div>
      </div>
      <div className="document-main">
        <div className="document-header">
          <h2>내부 프로젝트 - 문서함</h2>
          <ul>
            <li>카테고리별로 구분하는 기능</li>
            <li>검색기능</li>
            <li>페이징기능</li>
            <li>날짜 조회 기능</li>
            <li>페이징 갯수 선택 기능(선택)</li>
            <li>보존기간 후 삭제(선택)</li>
          </ul>
        </div>
        <div className="document-list">
          {documents.map((doc) => (
            <div key={doc.id}>{doc.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentComponent;
