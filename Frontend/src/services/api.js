import axios from "axios";

const baseURL = "http://backend:5000";

const api = axios.create({
  baseURL: baseURL
})

if (import.meta.env.DEV && window.location.hostname === 'localhost')
  api.defaults.baseURL = "http://localhost:5000"

export default api
