import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default ({ app }) => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: 'http://localhost:5001',
      vuex: {
        store: app.store,
        actionPrefix: 'socket_',
        mutationPrefix: 'socket_'
      }
    })
  )
}
