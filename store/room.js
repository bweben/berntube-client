import io from 'socket.io-client'
const socket = io('http://localhost:5001')

export const state = () => ({
  selected: {}
})

export const mutations = {
  set(state, room) {
    state.selected = room
  },

  join(state, id) {
    socket.emit('join', id)
  }
}

export const actions = {
  async get({ commit }, id) {
    const room = await this.$axios.$get(
      `http://localhost:5000/api/v1/room/${id}`
    )
    commit('set', room)
  },

  update({ commit }, room) {
    commit('set', room)
  }
}
