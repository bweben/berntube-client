<template>
  <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <nuxt-link :to="'/room/' + item.id">
        {{ item.name }}
      </nuxt-link>
    </a-list-item>
  </a-list>
</template>
<script lang="ts">
interface BasicRoom {
  id: number
  name: string
}

const data: BasicRoom[] = [
  {
    id: 1,
    name: 'BärnBoys Room'
  },
  {
    id: 2,
    name: 'Zwöite Room'
  }
]

export default {
  name: 'BtRoomList',
  props: {},
  data() {
    return {
      data
    }
  }
}
</script>
