import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fake-json-server-upload.herokuapp.com",
});

export default axiosInstance;
