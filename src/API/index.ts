import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {AppDebugger} from 'mobile-app-debugger';

export const baseUrl = 'https://ergast.com/api';

export const isAppDebuggerEnabled = false;
export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    const access_token = await AsyncStorage.getItem('@access_token');

    config.headers = {
      ...config.headers,
      Authorization: access_token ? access_token : '',
      Accept: 'application/json',
      'Content-Type': config.headers?.['Content-Type']
        ? config.headers['Content-Type']
        : 'application/json',
    };
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  },
);

axiosApiInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log('response', response);
    if (isAppDebuggerEnabled) {
      AppDebugger.network({
        url: response.config.url ? response.config.url : '',
        method: response.config.method ? response.config.method : '',
        status: response.status,

        reqData: response.config.data,
        reqHeaders: response.config.headers,

        resData: response.data,
        resHeaders: response.headers,
      });
    }

    return response;
  },
  async function (error: AxiosError) {
    console.log('error', JSON.stringify(error));

    if (isAppDebuggerEnabled) {
      AppDebugger.network({
        url: error.config.url || '',
        method: error.config.method || '',
        status: error.status ? parseInt(error.status) : 200,

        reqData: error.config.data,
        reqHeaders: error.config.headers,

        resData: error.response?.data,
        resHeaders: error.response?.headers,
      });
    }

    if (error && error.response && error.response.status === 401) {
      //todo обработать выход/удаление токена при его потухании
      // store.dispatch(reset());
      // delete axiosApiInstance.defaults.headers.common.Authorization;
      // await AsyncStorage.removeItem('@access_token');
    }

    return Promise.reject(error);
  },
);
