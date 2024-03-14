import axios from 'axios'
import { config } from '@/config/config'

const APIInstance = axios.create({
    baseURL: config.API_URL
})

export default APIInstance