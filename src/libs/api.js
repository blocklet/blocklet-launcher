import axios from 'axios';

axios.defaults.baseURL = '';
axios.defaults.timeout = 200000;

axios.interceptors.request.use((config) => {
  const prefix = window.blocklet ? window.blocklet.prefix : window.env.apiPrefix;
  config.baseURL = prefix || '';
  return config;
});

export default axios;
