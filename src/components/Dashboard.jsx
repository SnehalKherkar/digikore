// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = ({ currentUser, onLogout }) => {
  const [files, setFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [downloadProgress, setDownloadProgress] = useState({});

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem(`files_${currentUser}`)) || [];
    setFiles(storedFiles);
  }, [currentUser]);

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (uploadFile) {
      const newFile = { name: uploadFile.name, data: '', progress: 0 };
      setFiles(prevFiles => [...prevFiles, newFile]);

      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(prevProgress => ({
            ...prevProgress,
            [uploadFile.name]: progress
          }));
        }
      };
      reader.onloadend = () => {
        const newFileData = { ...newFile, data: reader.result };
        const updatedFiles = [...files, newFileData];
        setFiles(updatedFiles);
        localStorage.setItem(`files_${currentUser}`, JSON.stringify(updatedFiles));
        setUploadProgress(prevProgress => ({
          ...prevProgress,
          [uploadFile.name]: 100
        }));

        setTimeout(() => {
          setUploadProgress(prevProgress => ({
            ...prevProgress,
            [uploadFile.name]: 0
          }));
        }, 1000);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const handleFileDownload = (fileName) => {
    const storedFiles = JSON.parse(localStorage.getItem(`files_${currentUser}`)) || [];
    const file = storedFiles.find(f => f.name === fileName);
    if (file) {
      const link = document.createElement('a');
      link.href = file.data;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      let progress = 0;
      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setDownloadProgress(prevProgress => ({
            ...prevProgress,
            [fileName]: progress
          }));
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(prevProgress => ({
              ...prevProgress,
              [fileName]: 0
            }));
          }, 1000);
        }
      }, 300);
    } else {
      alert('No file to download');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(`files_${currentUser}`);
    onLogout();
    return <Navigate to="/" />;
  };

  return currentUser ? (
    <div className='dashboard-page'>
      <div className='welcom-div'>
        <h2 className='welcom'>Welcome, {currentUser}</h2>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <input className='file-input' type="file" onChange={handleFileChange} />
        <button className='file-btn' onClick={handleFileUpload}>Upload File</button>
      </div>
      <div className="file-list">
        {files.map(file => (
          <div key={file.name} className="file-item">
            <p>{file.name}</p>
            {uploadProgress[file.name] > 0 && (
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${uploadProgress[file.name]}%` }}></div>
              </div>
            )}
            <button className='download-btn' onClick={() => handleFileDownload(file.name)}>Download</button>
            {downloadProgress[file.name] > 0 && (
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${downloadProgress[file.name]}%` }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Dashboard;
