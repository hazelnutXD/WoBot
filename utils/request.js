const axios = require("axios");

const service = axios.create({
  baseURL:`https://api.wows.linxun.link`,
});

service.interceptors.request.use((config) => {
  config.headers.Authorization = process.env.api_key;
  return config;
});

service.interceptors.response.use((response) => {
  return response;
});

module.exports = service;