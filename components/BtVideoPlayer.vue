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
    this.player = videojs(this.$refs.videoPlayer, {
      autoplay: true,
      controls: true,
      fluid: true
    })

    this.player.on('ended', function() {
      console.log('video ended')
    })
  },

  watch: {
    options(newValue, oldValue) {
      this.player.options = newValue
      console.log(newValue.sources[0])
      this.player.src(newValue.sources[0])
      this.player.ready(() => {
        this.player.play()
      })
    }
  },

  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style scoped></style>
