// src/components/Feed.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Document.css';

const Document = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the files from the backend
    axios.get('/api/files')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the files!', error);
      });
  }, []);

  return (
    <div className="feed-container">
      <h1>File Feed</h1>
      <ul>
        {files.map(file => (
          <li key={file.id} className="feed-item">
            <h2>{file.title}</h2>
            <p>{file.description}</p>
            <a href={file.downloadUrl}>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Document;
