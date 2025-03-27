import axios from "axios";

const api = axios.create({
  baseURL: "",

  // marclod: essa bendita url tive que usar ngrok pq meu celular
  // e meu pc estão em redes diferentes ???????????????  coloquem seus ipv4 e + porta 5000
});

const httpService = {
  get: (path: string) => {
    return api.get(path);
  },

  post: (path: string, json: any) => {
    return api.post(path, json);
  },
};

export default httpService;
