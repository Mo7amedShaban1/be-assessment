import axios, { AxiosRequestConfig } from 'axios';
import { performance } from 'perf_hooks';

export const sendHttpRequest = (url: any, options: AxiosRequestConfig<any>) => {
    const timingStart = performance.now();
    return axios
        .get(url, options)
        .then(({ status }) => ({
            responseTime: parseInt(`${performance.now() - timingStart}`),
            status,
        }))
        .catch((error) => ({
            responseTime: parseInt(`${performance.now() - timingStart}`),
            status: error?.response?.status,
        }));
};
