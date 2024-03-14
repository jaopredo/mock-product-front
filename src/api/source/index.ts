import { AxiosRequestConfig } from 'axios'
import APIInstance from ".."

export default class APISource {
    static post<T>(path: string, data: T, options: AxiosRequestConfig<any> = {}): Promise<any> {
        return APIInstance.post<{}, T>(path, data, options)
    }
}
