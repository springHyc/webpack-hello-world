import axios from 'axios';
// import API_HOST from './config/apihost.js';

const http = axios.create({
    xsrfCookieName: 'xsrf-token',
    // baseURL: API_HOST.URL,
    baseURL: 'http://127.0.0.1:4321',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

http.interceptors.request.use(
    config => {
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            if (typeof config.data !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {
                config.data = JSON.stringify(config.data);
            }
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

http.interceptors.response.use(
    async data => data,
    error => {
        if (error.response) {
            if (error.response.status === 500) {
                console.log('服务器错误，请联系管理员处理');
            }
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    }
);

export default http;
