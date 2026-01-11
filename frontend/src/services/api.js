import axios from "axios";

const BASE_URL = "https://rockfall-prediction-ai-luqr.onrender.com";

export const fetchWeather = (lat, lon) =>
  axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}`);

export const predictRisk = (payload) =>
  axios.post(`${BASE_URL}/predict`, payload);
