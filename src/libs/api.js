import axios from 'axios';

axios.defaults.timeout = 200000;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

// axios.interceptors.request.use((config) => {
//   const prefix = window.blocklet ? window.blocklet.prefix : window.env.apiPrefix;
//   config.baseURL = prefix || '';
//   return config;
// });

export default axios;
