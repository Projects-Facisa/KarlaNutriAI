import axios from "axios";
import * as SecureStore from "expo-secure-store";

//COLOQUE AQUI SEU IP ATUAL
//EXEMPLO "10.5.11.205"
export const localURL = ""

const api = axios.create({
  baseURL: `http://${localURL}:5000/`,
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

export const httpService = {
  get: (path: string) => api.get(path),
  post: (path: string, json: any) => api.post(path, json),
  put: (path: string, json: any) => api.put(path, json),
  delete: (path: string) => api.delete(path),
};

