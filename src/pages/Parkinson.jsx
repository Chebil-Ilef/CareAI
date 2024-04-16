import React, { useState, useEffect } from 'react';
import './FileInput.css'; // Import your CSS file

const Parkinson = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {

    if (file) {
     

      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:5000/parkinson', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
        setError(null); // Clear error message
      })
      .catch(error => console.error('Error:', error));
    }
  }, [file]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  
  return (
    <>
    <h2>Parkinson Detection</h2>

    <div className="container">

      <div
        className={`drag-area ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >

        <div className="icon">
          <i className="fas fa-cloud-upload-alt"></i>
        </div>
        <header>Drag & Drop to Upload File</header>
        <span>OR</span>
        <button onClick={() => document.querySelector('input[type="file"]').click()}>Browse File</button>
        <input type="file" hidden onChange={handleFileChange} accept=".csv" />
      </div>
  

    </div>
    <div className="result-container">
    {error ? (
      <p style={{ color: 'red' }}>{error}</p>
    ) : (
      result && (
        <>
          <h3>Result:</h3>
          <p>{result}</p>
        </>
      )
    )}

      </div>
    </>
  );
  
};

export default Parkinson;
