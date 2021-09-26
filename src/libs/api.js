import axios from 'axios';

axios.defaults.timeout = 200000;
axios.defaults.withCredentials = false;
axios.defaults.crossDomain = true;

export default axios;
