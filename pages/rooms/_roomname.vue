<template>
  <v-sheet>
    <div v-if="splitview">
      <v-list>
        <v-list-item v-for="(msg,index) of committedMessages" :key="index">
          <v-list-item-content class="committed-text" v-if="msg">{{msg.text}}</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card outlined>
        <v-list>
          <v-list-item v-for="(msg,index) of writingMessages" :key="index">
            <v-list-item-content class="d-flex align-end" v-if="msg">
              <span class="my-0 writing-text">{{msg.text}}</span>
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
      <!-- <v-list> -->
      <!-- <v-slide-x-transition group> -->
      <v-scroll-y-reverse-transition group>
        <template v-for="(msg,index) of reversedMessages">
          <!-- <v-list-item v-for="(msg,index) of reversedMessages" :key="index"> -->
          <v-list-item v-if="msg" :key="index">
            <v-list-item-content v-if=" !msg.isWriting" class="committed-text">{{msg.text}}</v-list-item-content>
            <v-list-item-content v-else class="d-flex align-end writing-text">
              <span class="my-0 writing-text-content">{{msg.text}}</span>
              <v-list-item-icon class="mx-0">
                <v-icon class="writing-icon">mdi-settings-helper</v-icon>
                <!-- <v-icon>mdi-fountain-pen</v-icon> -->
              </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-scroll-y-reverse-transition>
      <!-- </v-slide-x-transition> -->
      <!-- </v-list> -->
    </div>
    <!-- <v-card>{{committedMessages}}</v-card>
    <v-card>{{writingMessages}}</v-card>-->
    <!-- 文字入力フィールド -->
    <v-footer app fixed padless color="blue lighten-2">
      <v-card width="100%" height="56px" class="d-flex align-baseline ma-2" outlined>
        <v-text-field
          v-model="text"
          placeholder="message"
          height="100%"
          single-line
          flat
          solo
          :rules="rules.counter"
          @keydown.enter="commit"
        ></v-text-field>
        <v-btn text height="100%" min-width="88px" @click="commit">送る</v-btn>
      </v-card>
    </v-footer>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import firebase from "../../plugins/firebase"
import { firestore } from "firebase"
// import * as uuid from "uuid/v5"
const uuid = require("uuid/v4")

interface Imessage {
  text: string
  isWriting: boolean
}

export default {
  name: `rooms`,
  components: {},
  data() {
    return {
      roomname: ``,
      splitview: false,
      messages: null,
      text: ``,
      nowtextkey: null,
      rules: {
        counter: [(v: string) => v.length <= 60 || "60文字までです"]
      }
    }
  },
  computed: {
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
  watch: {
    text() {
      // console.log(this.text)
      const messagesDocRef = firebase
        .firestore()
        .collection(`messages`)
        .doc(this.roomname)

      if (!this.nowtextkey) {
        if (!this.text) return

        this.nowtextkey = uuid()
        // this.nowtextkey = messagesDocRef.({
        //   text: this.text,
        //   isWriting: true,
        //   createTime: firestore.Timestamp.now().seconds,
        // }).key
      } else {
        // if (this.text) {
        //   messagesRef.child(`${this.nowtextkey}`).update({
        //     text: this.text,
        //     isWriting: true
        //   })
        // } else {
        //   messagesRef.child(`${this.nowtextkey}`).remove()
        //   this.nowtextkey = null
        // }
      }
    }
  },
  methods: {
    commit() {
      if (!this.nowtextkey) return
      if (this.text.length > 60) return

      firebase
        .database()
        .ref(`rooms/${this.roomname}/messages/${this.nowtextkey}`)
        .update({
          text: this.text,
          isWriting: false
        })
      this.nowtextkey = null
      this.text = ``
    }
  },
  created() {
    this.roomname = this.$route.params.roomname
    this.$store.dispatch(`bindMessages`, this.$route.params.roomname)
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