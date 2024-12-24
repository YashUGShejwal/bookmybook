import React, { useState, useCallback } from "react";

import axiosInstance from "../utils/axiosInstance";
import { useSnackbar } from "notistack";

import { useSelector, useDispatch } from "react-redux";

const useQuery = ({ url, showSnack, reduxConfig, onSuccess, onError }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const reduxData = useSelector((state) => state[reduxConfig?.name || "auth"]);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const fetchData = useCallback(async () => {
    if (reduxData.pulled) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(url);
      setResponse(res);
      if (res.status == 200 && onSuccess) {
        onSuccess(res.data);
      }
      if (res.status == 200 && reduxConfig) {
        dispatch(reduxConfig.action(res.data[reduxConfig.dataAttr]));
      }
      if (showSnack && showSnack == true) {
        if (res.status == 200) {
          enqueueSnackbar(res.data?.message || "Data fetched successfully!", {
            variant: "success",
          });
        }
      }
    } catch (err) {
      setError(err);
      if (onError) {
        onError(err);
      }
      console.log(err, "ERROR");
      if (showSnack && showSnack == true) {
        enqueueSnackbar(err.response?.data?.message || "Something went wrong", {
          variant: "error",
        });
      }
    }
    setIsLoading(false);
  }, []);

  return {
    response,
    isLoading,
    error,
    fetchData,
    [reduxConfig?.dataAttr]: reduxData[reduxConfig?.dataAttr],
  };
};

export default useQuery;
