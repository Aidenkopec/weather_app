import React from 'react';

const WeatherInfo = ({ weather, addToFavorites }) => {
    return (
        weather.main && (
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
                    <button onClick={addToFavorites} className="add-to-favorites-btn">
                        Add to Favorites
                    </button>
                </div>
            </div>
        )
    );
};

export default WeatherInfo;
