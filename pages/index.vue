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
import firebase from "~/plugins/firebase"

export default Vue.extend({
  components: {},
  data() {
    return {
      rooms: null
    }
  },
  mounted() {
    // const roomsRef =
    firebase
      .database()
      .ref(`rooms`)
      .on("value", snapshot => {
        this.rooms = snapshot.val()
      })
  }
})
// export class Index extends Vue {}
</script>
