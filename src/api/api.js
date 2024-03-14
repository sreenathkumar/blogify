import axios from "axios";

// ====================================================
// 1. Create a new instance of axios with a custom config
// 2. Set the baseURL to the server's URL
// 3. Set the timeout to 1000ms
// ====================================================
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});
