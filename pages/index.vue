<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <v-list>
          <v-list-item v-for="room of rooms" :key="room.key">
            <v-list-item-title>
              <v-btn nuxt outlined :to="{path:`/rooms/${room.name}`}">{{room.name}}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <v-card></v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
// import Logo from "~/components/Logo.vue"
// import VuetifyLogo from "~/components/VuetifyLogo.vue"
import { Component, Vue } from "vue-property-decorator"
import firebase from "../plugins/firebase"
import * as scheduler from "../scheduler"

export default Vue.extend({
  components: {},
  data() {
    return {
      // rooms: null
    }
  },
  computed: {
    rooms() {
      firebase
        .firestore()
        .collection(`rooms`)
        .get()
        .then(v => {
          return v
        })
    }
  },
  mounted() {
    // scheduler.deleteExpiredMessage()
    // this.rooms = firebase.firestore().collection(`rooms`)
  }
})
// export class Index extends Vue {}
</script>
