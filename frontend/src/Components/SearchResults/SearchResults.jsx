import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
    const query = useQuery().get('query');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:5000/api/search?query=${query}`)
                .then(response => {
                    setResults(response.data);
                    setError('');
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        setError('Sorry, no results found');
                        setResults([]);
                    } else {
                        setError('Error fetching search results');
                    }
                });
        }
    }, [query]);

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
        <div className='search-results'>
            <h1>Search Results for "{query}"</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul className='file-results'>
                    {results.map(file => (
                        <li key={file._id}>
                            <h2>{file.title}</h2>
                            <p>{file.description}</p>
                            <button  onClick={() => handleDownload(file._id)}>Download</button>
                            <button  onClick={() => handleEmailFile(file._id)}>Email File</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResults;
