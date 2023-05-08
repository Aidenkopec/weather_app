import React, {useEffect, useState} from 'react';
import {fetchWeather} from './api/fetchWeather';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async () => {
        const data = await fetchWeather(query);
        setWeather(data);
        setQuery('');
    };

    const fetchWeatherData = async (city) => {
        const data = await fetchWeather(city);
        setWeather(data);
    };

    useEffect(() => {
        fetchWeatherData('New York');

        return () => {
            setWeather({});
        };
    }, []);

    return (
        <div className="main-container">
            <SearchBar query={query} setQuery={setQuery} search={search}/>
            <WeatherInfo weather={weather}/>
        </div>
    );
};

export default App;

