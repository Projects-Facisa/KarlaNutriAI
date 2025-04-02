import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "", // Não Upem o ip de vcs junto
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
