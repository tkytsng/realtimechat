<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card flat>
        <v-btn
          v-for="room in rooms"
          :key="room.index"
          nuxt
          outlined
          class="ma-1"
          :to="{ path: `/room`, query: { id: room.id } }"
          >{{ room.id }}</v-btn
        >
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import firebase from "../plugins/firebase"
// import { mapGetters } from "vuex"
// import * as scheduler from "../scheduler"

export default {
  name: "home",
  components: {},
  data() {
    return {
      // rooms: []
    }
  },
  computed: {
    rooms() {
      // console.log(this.$store.state.rooms)
      return this.$store.state.rooms.data
    }
  },
  created() {
    this.$store.dispatch(`bindRooms`)
  }
}
export class Index extends Vue {}
</script>
