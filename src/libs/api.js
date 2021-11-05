import axios from 'axios';
import joinUrl from 'url-join';

axios.defaults.timeout = 200000;
axios.defaults.withCredentials = false;
axios.defaults.crossDomain = true;

axios.interceptors.request.use((config) => {
  const prefix = window.blocklet ? window.blocklet.prefix : '';
  config.baseURL = prefix || '';
  config.url = joinUrl('/api', config.url);

  return config;
});
export default axios;
