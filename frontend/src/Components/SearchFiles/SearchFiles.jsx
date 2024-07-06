import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation
import './SearchFiles.css'


const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
       event.preventDefault();
       if (query.trim() !== ''){
          // Redirect to search results page
          navigate(`/search?query=${query.trim()}`);
       }
    };

    return (
        <div className='search-container'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button  onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
