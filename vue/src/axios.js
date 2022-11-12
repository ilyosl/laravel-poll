import axios from 'axios'
import store from './store'

const url = 'http://localhost:8000/api'

const axiosClient = axios.create({
    baseURL: url
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config
})

export default axiosClient