import axios from 'axios';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://206.189.45.141/api/'
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            config.headers = {
                'Authorization': `Bearer ${''}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;