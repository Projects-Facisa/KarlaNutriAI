import axios from 'axios'

const httpService = {
    get: (url: string) => {
        return axios.get(url)
    },
    
    post: (url: string, json: any ) => {
        return axios.post(url, json)
    }
}

export default httpService