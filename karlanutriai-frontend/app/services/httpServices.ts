import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://192.168.0.12:5000/",
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const httpService = {
  get: (path: string) => api.get(path),
  post: (path: string, json: any) => api.post(path, json),
  put: (path: string, json: any) => api.put(path, json),
  delete: (path: string) => api.delete(path),
};

export default httpService;
