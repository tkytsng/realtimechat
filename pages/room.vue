<template>
  <div style="max-width:600px;margin:0 auto">
    <div v-if="splitview">
      <v-list>
        <v-list-item v-for="(msg, index) of committedMessages" :key="index">
          <v-list-item-content class="committed-text" v-if="msg">{{
            msg.text
          }}</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card outlined>
        <v-list>
          <v-list-item v-for="(msg, index) of writingMessages" :key="index">
            <v-list-item-content class="d-flex align-end" v-if="msg">
              <span class="my-0 writing-text">{{ msg.text }}</span>
              <v-list-item-icon class="mx-0">
                <v-icon>mdi-settings-helper</v-icon>
                <!-- <v-icon>mdi-fountain-pen</v-icon> -->
              </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <div v-else>
      <!-- <v-scroll-y-reverse-transition group> -->
      <template v-for="(msg, index) of Messages">
        <!-- <v-list-item v-for="(msg,index) of reversedMessages" :key="index"> -->
        <v-list-item v-if="msg" :key="index">
          <v-list-item-content v-if="!msg.isWriting" class="committed-text">{{
            msg.text
          }}</v-list-item-content>
          <v-list-item-content v-else class="d-flex align-end writing-text">
            <span class="my-0 writing-text-content">{{ msg.text }}</span>
            <v-list-item-icon class="mx-0">
              <v-icon class="writing-icon">mdi-settings-helper</v-icon>
              <!-- <v-icon>mdi-fountain-pen</v-icon> -->
            </v-list-item-icon>
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- </v-scroll-y-reverse-transition> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import firebase from "../plugins/firebase"
import { firestore } from "firebase"

export default {
  name: `room`,
  components: {},
  data() {
    return {
      roomname: ``,
      splitview: false,
      messages: null
    }
  },
  computed: {
    Messages() {
      if (!this.$store.state.room.messages) return
      return this.$store.state.room.messages
    },
    reversedMessages() {
      if (!this.$store.state.room.messages) return
      return Object.values(this.$store.state.room.messages as Object).reverse()
    },
    committedMessages() {
      if (!this.$data.messages) return
      return Object.values(this.$data.messages as Object).filter(
        m => !m.isWriting
      )
    },
    writingMessages() {
      if (!this.$data.messages) return
      return Object.values(this.$data.messages as Object).filter(
        m => m.isWriting
      )
    }
  },
  created() {
    const roomname = this.$route.query.id
    this.roomname = roomname
    // this.deleteExpiredMessage()
    this.$store.dispatch(`deleteExpiredMessage`, roomname, 100)
    this.$store.dispatch(`bindMessages`, roomname)
  }
}
export class Index extends Vue {}
</script>

<style scoped>
.committed-text {
  word-break: break-all;
}
.writing-text-content {
  max-width: 80%;
  overflow: hidden;
  overflow-wrap: normal;
  color: #888;
}
.writing-text .mdi-settings-helper {
  animation: flash 2s cubic-bezier(0.4, 0, 1, 1) infinite alternate;
}
.v-list-item__content > * {
  flex: none;
  margin-bottom: 0px;
}
.v-list-item__icon {
  align-self: flex-start;
  margin: 1px 0;
}
</style>
