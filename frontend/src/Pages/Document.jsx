import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Document.css'




const Document = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/allfiles'); // Replace with your backend API endpoint
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  //Handling downloads
  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/download/${id}`,{
        responseType: 'blob',
      });

      const contentType=response.headers['content-type']

      const blob = new Blob([response.data],{type: contentType})

      const url = window.URL.createObjectURL(blob);

      // Creating an anchor element
      const a = document.createElement('a')
      a.href =url
      a.download = `file_${id}.${getFileExtension(contentType)}`
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.open(url)

    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  // Function to extract file extension from content type
  const getFileExtension = (contentType) => {
    switch (contentType) {
      case 'application/pdf':
        return 'pdf';
      case 'image/jpeg':
        return 'jpg';
      case 'image/png':
        return 'png';
      // Add more cases as needed for other file types
      default:
        return 'file';
    }
  };



  //Handling emails
  const handleEmailFile = (id) => {
    // Redirect or handle sending email functionality here
    console.log(`Sending email for file with ID: ${id}`);
    // Example of redirection (replace with actual logic)
    window.location.href = `/sendfileform/${id}`;
  };

  return (
    <div className='file-grid'>
      <h1 className='file-feed'>File Feed</h1>
      <div className="file-list">
        {files.map((file) => (
          <div key={file._id} className="file-item">
            <h3 className='file-title'>{file.title}</h3>
            <p className='file-details'>{file.description}</p>
            <button className='file-download' onClick={() => handleDownload(file._id)}>Download</button>
            <button className='email-file' onClick={() => handleEmailFile(file._id)}>Email File</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Document;
