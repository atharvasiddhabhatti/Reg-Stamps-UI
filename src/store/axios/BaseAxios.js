import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://103.115.182.137/"
});

export default baseAxios;
