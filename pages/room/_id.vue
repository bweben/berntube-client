<template>
  <a-layout>
    <a-layout-header class="header">
      Room: {{ room && room.Name }}
    </a-layout-header>
    <a-layout-content class="content">
      <bt-video-player :options="videoOptions"></bt-video-player>
    </a-layout-content>
  </a-layout>
</template>

<script>
import BtVideoPlayer from '../../components/BtVideoPlayer'
import socket from '../../plugins/socket.io'

export default {
  components: { BtVideoPlayer },
  data() {
    return {
      id: this.$route.params.id
    }
  },

  computed: {
    room() {
      return this.$store.state.room.selected
    },
    videoOptions() {
      return {
        autoplay: true,
        controls: true,
        techOrder: ['youtube'],
        sources: [
          {
            src:
              (this.room && this.room.Running) ||
              'https://www.youtube.com/watch?v=EzKImzjwGyM',
            type: 'video/youtube'
          }
        ],
        fluid: true
      }
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('room/get', params.id)
  },

  beforeMount() {
    socket.emit('test', 'hello world')
  }
}
</script>
<style scoped>
.header {
  color: white;
}

.content {
  padding: 15px;
  width: 80%;
  margin: auto;
}
</style>
