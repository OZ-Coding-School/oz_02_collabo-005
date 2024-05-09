import axios from "axios";
import useLoginStore from "../store/useStore";

const loginToken = useLoginStore.getState().loginToken;
const isLogin = useLoginStore.getState().isLogin;

const customAxios = (() =>
  axios.create({
    baseURL: import.meta.env.DEV ? "/api/v1" : "",
    headers: {
      "Content-Type": "application/json",
      Authorization: isLogin ? `Bearer ${loginToken}` : null,
    },
  }))();

// axios interceptor으로 공부..
// client.interceptors.request.use((config) => {
//   여기서 토큰 로직 핸들링
//   return config;
// });
export default customAxios;
