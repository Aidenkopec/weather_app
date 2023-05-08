/**
 * Weather App
 *
 * This is a simple React application that allows users to search for the current weather in any city.
 * The app fetches weather data from an external API and displays the results.
 */

// Import required modules
import React, {useState} from 'react';

// Import custom fetchWeather function
import {fetchWeather} from './api/fetchWeather';
// Import styling
import './App.css';
// import backgroundImage from './backgroundWeather.png';

/**
 * App component
 *
 * The main component of the Weather App. It handles user input, fetching weather data, and rendering
 * the results.
 */
const App = () => {
    // State for search query and weather data
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    /**
     * search function
     *
     * Handles fetching weather data for a given city. Triggered when the user presses the Enter key
     * or clicks the search button.
     */
    const search = async () => {
        // Fetch weather data for the given query
        const data = await fetchWeather(query);

        // Update state with fetched weather data and clear query
        setWeather(data);
        setQuery('');
    };

    // Render main app components
    return (
        <div className="main-container">
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
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img
                            className="city-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
