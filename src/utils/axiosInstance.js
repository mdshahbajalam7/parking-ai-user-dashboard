/* eslint-disable */
import axios from 'axios';

export const DEVELOPMENTURL = 'https://api.ridereadyhub.techpri.me';
// http://localhost:6768
// https://api.ridereadyhub.techpri.me


const axiosInstance = axios.create({
    baseURL: DEVELOPMENTURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
