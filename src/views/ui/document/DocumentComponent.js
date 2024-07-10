import React, { useState } from 'react';
import './DocumentComponent.css';
import { useNavigate } from 'react-router-dom';

const DocumentComponent = () => {
  const [documents, setDocuments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [writerEmpId, setWriterEmpId] = useState('');
  const [currentEmpId, setCurrentEmpId] = useState(1); // 예시를 위한 empId설정 수정해야함ㅋ
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleCategoryClick = async (categoryName) => {
    console.log(`${categoryName} clicked`);
    setSelectedCategory(categoryName);
    setPage(0); // 카테고리 변경 시 첫 페이지로 초기화
    fetchDocuments(categoryName, page, size);
  };

  const fetchDocuments = async (categoryName, page = 0, size) => {
    try {
      const response = await fetch('http://localhost:9000/document/api/docsList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ empId: currentEmpId, categoryName, page, size })
      });
      const data = await response.json();
      setDocuments(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', file);
    formData.append('category', category);
    formData.append('writerEmpId', currentEmpId); // 로그인한 유저의 아이디를 넣기

    try {
      const response = await fetch('http://localhost:9000/document/api/creation', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Document submitted successfully');
        setShowForm(false);
        // 폼 초기화
        setTitle('');
        setContent('');
        setFile(null);
        setCategory('');
        setWriterEmpId('');
        // 새로 등록된 문서를 포함하여 목록을 다시 로드
        if (selectedCategory) {
          fetchDocuments(selectedCategory, page, size);
        }
      } else {
        console.error('Error submitting document');
      }
    } catch (error) {
      console.error('There was an error submitting the document!', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchDocuments(selectedCategory, newPage, size);
  };

  return (
    <div className="document-component">
      <div className="document-sidebar">
        <button className="document-button" onClick={() => setShowForm(true)}>문서 등록</button>
        <div className="document-categories">
          <div onClick={() => handleCategoryClick('public')}>공통</div>
          <div onClick={() => handleCategoryClick('service')}>서비스사업부</div>
          <div onClick={() => handleCategoryClick('manage')}>관리지원부</div>
          <div onClick={() => handleCategoryClick('solution')}>솔루션사업부</div>
          <div onClick={() => handleCategoryClick('approval')}>전자결재</div>
        </div>
      </div>
      <div className="document-main">
        <table className="document-list">
          <thead>
            <tr>
              <th>제목</th>
              <th>문서종류</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td><a href="#" onClick={(e) => {e.preventDefault(); navigate(`detail/${doc.id}`); }}>{doc.title}</a></td>
                <td>{doc.category}</td>
                <td>{doc.empName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(totalPages).keys()].map(num => (
            <button key={num} onClick={() => handlePageChange(num)} disabled={num === page}>
              {num + 1}
            </button>
          ))}
        </div>
      </div>
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowForm(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
              </div>
              <div className="form-group">
                <label>File:</label>
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="service">서비스사업부</option>
                  <option value="solution">솔루션사업부</option>
                  <option value="manage">관리사업부</option>
                  <option value="public">공통</option>
                </select>
              </div>
              <div className="form-group">
                <label>Writer Emp ID:</label>
                <input type="hidden" value={currentEmpId} />
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentComponent;
