import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchWeather = (lat, lon) =>
  axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}`);

export const predictRisk = (payload) =>
  axios.post(`${BASE_URL}/predict`, payload);
