import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DocumentDetail.css';

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDocument, setEditedDocument] = useState({
    title: '',
    content: '',
    file: null
  });

    // 수정해야함 
    const currentUserId = parseInt(localStorage.getItem("empId"), 10);
    
    const formattedText = (text) => {
      return text.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
    };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`http://localhost:9000/document/detail/${id}`);
        const data = await response.json();
        setDocument(data);
        console.log(data);
        setEditedDocument({
          title: data.title,
          content: data.content,
          file: null
        });
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    fetchDocument();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:9000/document/delete/${id}`, {
        method: 'DELETE'
      });
      navigate('/document');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDocument((prevDocument) => ({
      ...prevDocument,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setEditedDocument((prevDocument) => ({
      ...prevDocument,
      file: e.target.files[0]
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('documentId', document.documentId);
    formData.append('title', editedDocument.title);
    formData.append('content', editedDocument.content);
    formData.append('writerEmpId', document.writerEmpId);
    if (editedDocument.file) {
      formData.append('file', editedDocument.file);
    }

    try {
      await fetch(`http://localhost:9000/document/update`, {
        method: 'PUT',
        body: formData
      });
      setDocument({
        ...document,
        title: editedDocument.title,
        content: editedDocument.content
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleGoList = () => {
    navigate(`/document`);
  }

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="document-detail">
      <h1>{document.title}</h1>
      <p><strong>Category:</strong> {document.category}</p>
      <p><strong>Writer:</strong> {document.writerName}</p>
      <p><strong>Created At:</strong> {document.createdAt}</p>
      <p><strong>Updated At:</strong> {document.updatedAt}</p>
      <p><strong>Content:</strong> {formattedText(document.content)}</p>
      {document.filePath && (
        <p>
          <strong>File:</strong> <a className="download-link" href={`http://localhost:9000/document/${document.documentId}/download`} download>{document.filePath}</a>
        </p>
      )}
       {document.writerEmpId === currentUserId && (
        <>
          <button onClick={handleOpenModal}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      <button onClick={handleGoList}>목록으로</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>Edit Document</h2>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editedDocument.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                Content:
                <textarea
                  name="content"
                  value={editedDocument.content}
                  onChange={handleChange}
                />
              </label>
              <label>
                File:
                <input
                  type="file"
                  onChange={handleFileChange}
                />
              </label>
            </form>
            <div className="modal-actions">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetail;
