import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const API_BASE_URL = 'http://localhost:3001/cities';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(API_URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        },
    });

    return data;
};

export const getFavoriteCities = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const addFavoriteCity = async (city) => {
    const response = await axios.post(`${API_BASE_URL}/add`, city);
    const newCity = response.data;
    console.log('newCity:', newCity);
    return newCity;
};


