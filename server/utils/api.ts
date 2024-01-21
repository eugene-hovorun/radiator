import axios from "axios";

export const api = axios.create({
  baseURL: "https://radio.garden/api/ara/content",
});
