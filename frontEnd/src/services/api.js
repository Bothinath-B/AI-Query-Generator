import axios from "axios";

const API = "http://127.0.0.1:8000";

export const generateSQL = (prompt) =>
  axios.post(`${API}/generate-sql`, { prompt });

export const runSQL = (query) =>
  axios.post(`${API}/run-sql`, { query });

export const explainSQL = (query) =>
  axios.post(`${API}/explain`, { query });
