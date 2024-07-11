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

<<<<<<< HEAD
    // 수정해야함 
=======
    // 현재 사용자 ID를 예시로 설정합니다. 실제로는 인증 로직에 따라 설정되어야 합니다.
>>>>>>> main
    const currentUserId = 1;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`http://localhost:9000/document/detail/${id}`);
        const data = await response.json();
        setDocument(data);
<<<<<<< HEAD
        console.log(data);
=======
        console.log(document);
>>>>>>> main
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
<<<<<<< HEAD
      await fetch(`http://localhost:9000/document/delete/${id}`, {
        method: 'DELETE'
      });
      navigate('/document');
=======
      await fetch(`http://localhost:9000/document/${id}`, {
        method: 'DELETE'
      });
      navigate('/documents');
>>>>>>> main
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
<<<<<<< HEAD
    formData.append('writerEmpId', document.writerEmpId);
=======
>>>>>>> main
    if (editedDocument.file) {
      formData.append('file', editedDocument.file);
    }

    try {
<<<<<<< HEAD
      await fetch(`http://localhost:9000/document/update`, {
=======
      await fetch(`http://localhost:9000/document/${id}`, {
>>>>>>> main
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
      <p><strong>Content:</strong> {document.content}</p>
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
