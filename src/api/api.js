import axios from 'axios'

const Api = axios.create({
    baseURL: "http://192.168.9.20:5000/api/users",
    withCredentials: false,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
    }
})

export default Api