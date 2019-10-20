export const state = () => ({
  selected: {},
  playing: true
})

export const mutations = {
  set(state, room) {
    state.selected = room
  },

  playing(state, playing) {
    state.playing = playing
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
  },

  playing({ commit }, playing) {
    commit('playing', playing)
  }
}
