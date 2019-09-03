<template>
  <div>
    <h1>{{ room && room.Name }}</h1>
    <bt-video-player :options="videoOptions"></bt-video-player>
  </div>
</template>

<script>
import BtVideoPlayer from '../../components/BtVideoPlayer'

export default {
  components: { BtVideoPlayer },
  data() {
    return {
      id: this.$route.params.id,
      videoOptions: {
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

  computed: {
    room() {
      return this.$store.state.room.selected
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('room/get', params.id)
  }
}
</script>
