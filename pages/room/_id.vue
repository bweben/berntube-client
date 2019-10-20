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
      <bt-yt-video-player v-else :options="videoOptions"></bt-yt-video-player>
    </a-layout-content>
  </a-layout>
</template>

<script>
import BtVideoPlayer from '../../components/BtVideoPlayer'
import BtYtVideoPlayer from '../../components/BtYtVideoPlayer'

export default {
  mounted() {
    this.$socket.emit('join', this.id)
  },

  components: { BtVideoPlayer, BtYtVideoPlayer },
  data() {
    return {
      id: this.$route.params.id,
      videoOptions: {
        autoplay: true,
        controls: true,
        techOrder: ['youtube'],
        fluid: true,
        sources: []
      }
    }
  },

  computed: {
    room() {
      return this.$store.state.room.selected
    }
  },

  created() {
    this.$store.subscribe((_, state) => {
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
      this.$socket.emit('link', url)
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
