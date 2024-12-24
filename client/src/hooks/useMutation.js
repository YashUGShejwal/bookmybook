import React, { useState, useCallback } from 'react';

import axiosInstance from '../utils/axiosInstance';
import { useSnackbar } from 'notistack';

const useMutation = ({ url, showSnack, onSuccess, onError }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const mutate = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(url, data);
      setResponse(res);
      if (res.status == 200 && onSuccess) {
        console.log(res.data);
        onSuccess(res.data);
      }
      if (showSnack && showSnack == true) {
        if (res.status == 200) {
          enqueueSnackbar(res.data?.message || 'Request successfully!', {
            variant: 'success',
          });
        }
      }
    } catch (err) {
      setError(err);
      if (onError) {
        onError(err);
      }
      console.log(err, 'ERROR');
      if (showSnack && showSnack == true) {
        enqueueSnackbar(err.response?.data?.message || 'Something went wrong', {
          variant: 'error',
        });
      }
    }
    setIsLoading(false);
  }, []);

  return {
    response,
    isLoading,
    error,
    mutate,
  };
};

export default useMutation;
