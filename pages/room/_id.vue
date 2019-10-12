<template>
  <a-layout>
    <a-layout-header class="header">
      Room: {{ room && room.Name }}
      <a-input
        class="half-width"
        placeholder="Video Link"
        @keyup.enter="changeVideo($event.target.value)"
      />
    </a-layout-header>
    <a-layout-content class="content">
      <bt-video-player :options="videoOptions"></bt-video-player>
    </a-layout-content>
  </a-layout>
</template>

<script>
import io from 'socket.io-client'
import BtVideoPlayer from '../../components/BtVideoPlayer'

export default {
  mounted() {
    this.socket = io('http://localhost:5001')

    this.socket.emit('join', this.id)

    this.socket.on('link-update', (data) => {
      console.log('link-update')
      console.log(data)
      this.$store.dispatch('room/update', data)
    })
  },

  components: { BtVideoPlayer },
  data() {
    return {
      id: this.$route.params.id,
      socket: {},
      videoOptions: {
        autoplay: true,
        controls: true,
        techOrder: ['youtube'],
        fluid: true
      }
    }
  },

  computed: {
    room() {
      return this.$store.state.room.selected
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      this.videoOptions = {
        ...this.videoOptions,
        sources: [
          {
            src: state.room.selected.Running,
            type: 'video/youtube'
          }
        ]
      }
    })
  },

  methods: {
    changeVideo(url) {
      this.socket.emit('link', url)
    }
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
  height: calc(100vh - 94px);
  margin: auto;
}

.half-width {
  margin-left: 20px;
  width: 50%;
}
</style>
