// ----------------------------------------------------------------------

import axiosInstance from './axiosInstance';

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  return true;
};

const setSession = (accessToken) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = accessToken;
    localStorage.setItem('accessToken', accessToken);
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
    localStorage.removeItem('accessToken');
  }
};

export { isValidToken, setSession };
