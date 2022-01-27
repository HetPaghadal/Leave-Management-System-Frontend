import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/',
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;
