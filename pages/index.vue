<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <v-list>
          <v-list-item v-for="room in rooms" :key="room.index">
            <v-list-item-title>
              <v-btn nuxt outlined :to="{path:`/rooms/${room.id}`}">{{room.id}}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <!-- <v-card>{{rooms}}</v-card> -->
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import firebase from "../plugins/firebase"
// import { mapGetters } from "vuex"
// import * as scheduler from "../scheduler"

export default {
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
