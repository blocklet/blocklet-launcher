import axios from 'axios';

axios.defaults.timeout = 200000;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

export default axios;
