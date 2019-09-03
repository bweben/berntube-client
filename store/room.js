import { AxiosInstance as axios } from 'axios'

export const room = () => ({})

export const mutations = {}

export const actions = {
  async GET_STORE({ commit }) {
    const { data } = await axios.get('localhost:5000/api/v1/room/')
    commit('SET_ROOM', data)
  }
}
