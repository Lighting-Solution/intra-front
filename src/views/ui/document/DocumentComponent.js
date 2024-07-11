import React, { useState, useEffect } from 'react';
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
  // const [currentEmpId, setCurrentEmpId] = useState(localStorage.getItem("empId")); // 예시를 위한 empId설정 수정해야함ㅋ
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('public');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // 검색 조건 상태 추가
  const navigate = useNavigate();
  const currentEmpId = parseInt(localStorage.getItem("empId"), 10);
  const departmentId = parseInt(localStorage.getItem("departmentId"), 10); // 부서 ID 가져오기
  const positionId = parseInt(localStorage.getItem("positionId", 10));


  // 컴포넌트가 불러와질 때 호출되는 함수 -> 공통 문서를 가져오겠다
  useEffect(() => {
    fetchDocuments('public', null, null, 0, size);
  }, []);

  // 사이드바 클릭 시 동작하는 코드
  const handleCategoryClick = async (categoryName) => {
    console.log(`${categoryName} clicked`);
    setSelectedCategory(categoryName);
    setPage(0); // 카테고리 변경 시 첫 페이지로 초기화
    fetchDocuments(categoryName, null, null, 0, size);
  };

  const fetchDocuments = async (categoryName, searchTerm, searchType, page, size) => {
    try {
      let bodyData = { empId: currentEmpId, categoryName, searchType, page, size };

      if (searchType === 'date') {
        bodyData = { ...bodyData, startDate: searchTerm.startDate, endDate: searchTerm.endDate };
      } else {
        bodyData = { ...bodyData, searchTerm };
      }
      bodyData = {...bodyData, searchType};
      console.log(bodyData);
      const response = await fetch('http://localhost:9000/document/api/docsList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
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
          fetchDocuments(selectedCategory, searchTerm, searchType, page, size);
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
    fetchDocuments(selectedCategory, searchTerm, searchType, newPage, size);
  };

  // 검색어
  const handleSearchTermChange = (e) => {
    if (searchType === 'date') {
      setSearchTerm(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    } else {
      setSearchTerm(e.target.value);
    }
  };
  // 검색 타입 : 제목, 작성자, 기간
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm(''); // 검색 타입 변경 시 검색어 초기화
  };
  // 제출
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    fetchDocuments(selectedCategory ,searchTerm, searchType, 0, size);
  };

  const handleSearchCategoryType = (e) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  }

  const getCategoryOptions = () => {
    if (departmentId >= 100 && departmentId < 200 && positionId !== 1) {
      return (
        <>
          <option value="public">공통</option>
          <option value="service">서비스사업부</option>
        </>
      );
    } else if (departmentId >= 200 && departmentId < 300) {
      return (
        <>
          <option value="public">공통</option>
          <option value="manage">관리지원부</option>
        </>
      );
    } else if (departmentId >= 300) {
      return (
        <>
          <option value="public">공통</option>
          <option value="solution">솔루션사업부</option>
        </>
      );
    } else {
      return (
        <>
      <option value="public">공통</option>
      <option value="service">서비스사업부</option>
      <option value="manage">관리지원부</option>
      <option value="solution">솔루션사업부</option>
      </>
    );
    }
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
        <div className="document-header">
         {/* 검색하는 부분 */}
         <form onSubmit={handleSearchSubmit}>
            <select value={selectedCategory} onChange={handleSearchCategoryType}>
              <option value="public">공통</option>
              <option value="service">서비스</option>
              <option value="manage">관리</option>
              <option value="solution">솔루션</option>
              <option value="approval">전자결재</option>
            </select>
            <select value={searchType} onChange={handleSearchTypeChange}>
              <option value="title">제목</option>
              <option value="writer">작성자</option>
              <option value="date">기간</option>
            </select>
            {searchType !== 'date' ? (
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            ) : (
              <div>
                <input
                  type="date"
                  name="startDate"
                  value={searchTerm.startDate || ''}
                  onChange={handleSearchTermChange}
                />
                <input
                  type="date"
                  name="endDate"
                  value={searchTerm.endDate || ''}
                  onChange={handleSearchTermChange}
                />
              </div>
            )}
            <button type="submit">검색</button>
          </form>

        </div>
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
                  {getCategoryOptions()}
                </select>
              </div>
              <div className="form-group">
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
