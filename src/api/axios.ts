import axios from "axios";

const customAxios = (() =>
  axios.create({
    baseURL: import.meta.env.DEV ? "/api/v1" : "",
    headers: {
      "Content-Type": "application/json",
      // Authorization: import.meta.env.VITE_APP_API_TOKEN,
    },
  }))();

export default customAxios;
