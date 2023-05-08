import React, {useEffect, useState} from 'react';
import {fetchWeather, getFavoriteCities, addFavoriteCity} from './api/fetchWeather';

import './App.css';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [favoriteCities, setFavoriteCities] = useState([]);

    const search = async () => {
        try {
            const data = await fetchWeather(query);
            setWeather(data);
        } catch (error) {
            alert('Error: Invalid city name. Please try again.');
        }
    };

    const fetchWeatherData = async (city) => {
        const data = await fetchWeather(city);
        setWeather(data);
    };

    useEffect(() => {
        fetchWeatherData('New York');

        getFavoriteCities()
            .then((cities) => setFavoriteCities(cities))
            .catch((error) => console.error('Error fetching favorite cities:', error));

        return () => {
            setWeather({});
        };
    }, []);

    const addToFavorites = async () => {
        if (weather.name) {
            const city = {
                name: weather.name,
                country: weather.sys.country,
                temperature: Math.round(weather.main.temp),
                description: weather.weather[0].description,
            };

            try {
                await addFavoriteCity(city);
                const cities = await getFavoriteCities(); // re-fetch the list of favorite cities
                setFavoriteCities(cities);
            } catch (error) {
                console.error('Error adding favorite city:', error);
            }
        }
    };



    return (
        <div className="main-container">
            <SearchBar query={query} setQuery={setQuery} search={search}/>
            <WeatherInfo weather={weather} addToFavorites={addToFavorites}/>
            {favoriteCities.length > 0 && (
                <div className="favorite-cities">
                    <h3>Favorite Cities</h3>
                    <ul className="favorite-cities-list">
                        {favoriteCities.map((city) => (
                            <li key={city._id}>{city.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
