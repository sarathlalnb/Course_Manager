import axios from "axios";

const baseInstance = () => {
  const API_URL = "https://studyappmw.dev.luminartechnohub.com/api/v1";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return axios.create({
    baseURL: [API_URL],
    timeout: 5000,
    headers,
  });
};

const authInstance = () => {
  const API_URL = "https://studyappmw.dev.luminartechnohub.com/api/v1";
  const authToken = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return axios.create({
    baseURL: [API_URL],
    timeout: 25000,
    headers,
  });
};

export default { baseInstance, authInstance };
