import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://rickandmortyapi.com/",
});

export default axiosApi;
