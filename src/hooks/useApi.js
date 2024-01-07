import { useState } from "react";
import client from "../services/client";

const useApi = (type) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("token");

  const request = async (...args) => {
    setLoading(true);
    const [url, payload] = args;
    let response;
    const api = authToken ? client.authInstance() : client.baseInstance();
    try {
      if (type === "post") {
        response = await api.post(url, payload);
      } else if (type === "patch") {
        response = await api.patch(url, payload);
      } else {
        response = await api.get(url);
      }
      setError(!response.ok);
      setData(response.data);
      return { response, error: null };
    } catch (err) {
      setError(true);
      setData(null);
      return { response, error: err };
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, request };
};

export default useApi;
