<template>
  <div class="full-height">
    <youtube
      :key="videoOptions && videoOptions.start"
      :video-id="videoId"
      :player-vars="videoOptions"
      class="full-height"
      :player-width="'100%'"
      :player-height="'100%'"
      :host="'https://www.youtube-nocookie.com'"
      @ready="ready"
      @paused="onPaused"
      @playing="onPlay"
      @ended="ended"
      @seeked="onSeeked"
    ></youtube>
  </div>
</template>

<script>
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
  name: 'BtYtVideoPlayer',

  created() {
    this.$store.subscribe((_, state) => {
      if (state.room.playing) {
        this.play()
      } else {
        this.pause()
      }
    })
  },

  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  methods: {
    ready(event) {
      this.player = event.target
    },

    play() {
      if (this.player) {
        this.player.playVideo()
      }
    },

    pause() {
      if (this.player) {
        this.player.pauseVideo()
      }
    },

    onPaused() {
      this.pause()
      this.$socket.emit('pause', true)
    },

    onPlay() {
      this.play()
      this.$socket.emit('play', true)
    },

    onSeeked() {
      console.log('seeked')
    },

    ended() {
      this.$socket.emit('ended', true)
    }
  },

  computed: {
    videoId() {
      return this.options.sources.length === 1
        ? getIdFromURL(this.options.sources[0].src)
        : ''
    },

    videoOptions() {
      if (this.options.sources.length === 1) {
        const timeFromURL = getTimeFromURL(this.options.sources[0].src)
        return { start: timeFromURL, autoplay: 1 }
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.full-height {
  height: 100%;
  width: 100%;
}

iframe {
  height: 100% !important;
  width: 100% !important;
}
</style>
