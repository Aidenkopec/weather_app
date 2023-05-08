import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

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
