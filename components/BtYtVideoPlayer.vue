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
      @playing="play"
      @paused="pause"
      @ended="ended"
    ></youtube>
  </div>
</template>

<script>
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
  name: 'BtYtVideoPlayer',

  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    playing: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  methods: {
    ready(event) {
      this.player = event.target
    },

    play() {
      this.player.playVideo()
      this.$emit('play', true)
    },

    pause() {
      console.log('original pause')
      this.player.pauseVideo()
      this.$emit('pause', true)
    },

    ended() {
      this.$emit('ended', true)
    }
  },

  watch: {
    playing(newPlaying, oldPlaying) {
      if (newPlaying) {
        this.play()
      } else {
        this.pause()
      }
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
        console.log(timeFromURL)
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
