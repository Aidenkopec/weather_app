import React from 'react';

const SearchBar = ({ query, setQuery, search }) => {
    return (
        <div className="search-wrapper">
            <input
                type="text"
                className="search"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && search()}
            />
            <button onClick={search} className="search-btn">Search</button>
        </div>
    );
};

export default SearchBar;
