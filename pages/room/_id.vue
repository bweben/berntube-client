<template>
  <div>Test</div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },

  computed: {
    room() {
      return this.$store.state.rooms.find(
        (roomInList) => roomInList.id === this.id
      )
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('GET_ROOM', { params })
  }
}
</script>

<style scoped></style>
