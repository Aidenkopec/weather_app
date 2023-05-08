/**
 * Weather App
 *
 * This is a simple React application that allows users to search for the current weather in any city.
 * The app fetches weather data from an external API and displays the results.
 */

import React, {useEffect, useState} from 'react';
import {fetchWeather} from './api/fetchWeather';
import './App.css';

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

    // Function to fetch the weather data
    const fetchWeatherData = async (city) => {
        const data = await fetchWeather(city);
        setWeather(data);
    };

    // Fetch weather data for the static city when the component mounts
    useEffect(() => {
        fetchWeatherData('New York');

        // Return a cleanup function that resets the weather state
        return () => {
            setWeather({});
        };
    }, []);

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
