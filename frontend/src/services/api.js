import axios from "axios";

const BASE = "http://127.0.0.1:8000";

export const fetchWeather = (lat, lon) =>
  axios.get(`${BASE}/weather?lat=${lat}&lon=${lon}`);

export const predictRisk = (payload) =>
  axios.post(`${BASE}/predict`, payload);
