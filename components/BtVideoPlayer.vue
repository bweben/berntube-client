<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js'

// eslint-disable-next-line
import 'videojs-youtube'

export default {
  name: 'BtVideoPlayer',

  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      player: null
    }
  },

  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this)
      }
    )
  },

  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style scoped></style>
