export const state = () => ({
  rooms: []
})

export const mutations = {}

export const actions = {
  socket_playing({ dispatch }, data) {
    dispatch('room/playing', data)
  },

  'socket_link-update': ({ dispatch }, data) => {
    dispatch('room/update', data)
  }
}
