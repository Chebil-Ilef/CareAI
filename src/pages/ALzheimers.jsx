import React, { useState } from 'react';
import './styles/FileInput.css'; // Import your CSS file

const Alzheimers = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Add error state

  const handlePrediction = async () => {
    if (!file) {
      setError('Please upload an image file.'); // Set error message
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/alzheimers', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        setError(null); // Clear error message
      } else {
        throw new Error('Failed to get prediction');
      }
    } catch (error) {
      console.error(error);
      setResult('Error occurred while processing the image');
    }
  };

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
    <h2>Alzheimers Detection</h2>

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
        <input type="file" hidden onChange={handleFileChange} accept="image/*" />

      </div>
  

    </div>

    <div className="result-container">
    <button className='predict' onClick={handlePrediction}>Predict</button>

    {error ? (
      <p style={{ color: 'red' }}>{error}</p>
    ) : (
      result && (
        <>
          <h3>Alzheimer's Prediction:</h3>
          <p>{result}</p>
        </>
      )
    )}

      </div>
    </>
  );
};

export default Alzheimers;
