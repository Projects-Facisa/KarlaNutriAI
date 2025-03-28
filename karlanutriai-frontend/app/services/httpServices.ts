import axios from "axios";

const api = axios.create({
  baseURL: "", // Não Upem o ip de vcs junto
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
