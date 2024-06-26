import type { Model } from 'pinia-orm'
import { Repository, config } from 'pinia-orm'
import type { AxiosInstance } from 'axios'
import { useAxiosApi } from '../index'
import type { Config } from '../types/config'

export class AxiosRepository<M extends Model = Model> extends Repository<M> {
  axios: AxiosInstance = config?.axiosApi?.axios || null
  globalApiConfig = config?.axiosApi || {}
  apiConfig: Config = {}

  api () {
    return useAxiosApi(this)
  }

  setAxios (axios: AxiosInstance) {
    this.axios = axios
    return this
  }
}
