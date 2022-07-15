import axios from 'axios';
const APIKEY = '9c15e49c';
const axiosClient = axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=${APIKEY}`,
  timeout: 2000,
});
export default axiosClient;
