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
      <bt-video-player
        v-if="
          videoOptions.sources.length === 1 &&
            videoOptions.sources[0].src.indexOf('youtu') === -1
        "
        :options="videoOptions"
      ></bt-video-player>
      <bt-yt-video-player
        v-else
        :options="videoOptions"
        :playing="playing"
        @play="play"
        @pause="pause"
        @ended="ended"
      ></bt-yt-video-player>
    </a-layout-content>
  </a-layout>
</template>

<script>
import io from 'socket.io-client'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import BtVideoPlayer from '../../components/BtVideoPlayer'
import BtYtVideoPlayer from '../../components/BtYtVideoPlayer'

Vue.use(VueYouTubeEmbed)

export default {
  mounted() {
    this.socket = io('http://localhost:5001')

    this.socket.emit('join', this.id)

    this.socket.on('link-update', (data) => {
      console.log('link-update')
      console.log(data)
      this.$store.dispatch('room/update', data)
    })

    this.socket.on('playing', (playing) => {
      this.playing = playing
    })
  },

  components: { BtVideoPlayer, BtYtVideoPlayer },
  data() {
    return {
      id: this.$route.params.id,
      socket: {},
      videoOptions: {
        autoplay: true,
        controls: true,
        techOrder: ['youtube'],
        fluid: true,
        sources: []
      },
      playing: true
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
    },

    play() {
      console.log('play')
      this.socket.emit('play', true)
    },

    pause() {
      console.log('pause')
      this.socket.emit('pause', true)
    },

    ended() {
      console.log('ended')
      this.socket.emit('ended', true)
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

.full-height {
  height: 100%;
}
</style>
