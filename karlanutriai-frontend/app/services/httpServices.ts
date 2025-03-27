import axios from "axios";

const api = axios.create({
  baseURL:
    "https://c95d-2804-29b8-5078-2d7d-8d88-495e-ad6b-b84a.ngrok-free.app/",

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
