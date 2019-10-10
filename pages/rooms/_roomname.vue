<template>
  <v-sheet>
    <v-card height="56px" class="d-flex align-baseline ma-2" outlined>
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
    <!-- <v-card>{{committedMessages}}</v-card>
    <v-card>{{writingMessages}}</v-card>-->
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import firebase from "~/plugins/firebase"
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
      messages: null,
      text: ``,
      nowtextkey: null,
      rules: {
        counter: [(v: string) => v.length <= 60 || "60文字までです"]
      }
    }
  },
  computed: {
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
      const messagesRef = firebase
        .database()
        .ref(`rooms/${this.roomname}/messages`)

      if (!this.nowtextkey) {
        if (!this.text) return

        this.nowtextkey = messagesRef.push({
          text: this.text,
          isWriting: true
        }).key
      } else {
        if (this.text) {
          messagesRef.child(`${this.nowtextkey}`).update({
            text: this.text,
            isWriting: true
          })
        } else {
          messagesRef.child(`${this.nowtextkey}`).remove()
          this.nowtextkey = null
        }
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
  mounted() {
    this.roomname = this.$route.params.roomname
    firebase
      .database()
      .ref(`rooms/${this.roomname}/messages`)
      .on("value", snapshot => {
        this.messages = snapshot.val()
      })
  }
}
export class Index extends Vue {}
</script>

<style scoped>
.committed-text {
  word-break: break-all;
}
.writing-text {
  max-width: 80%;
  overflow: hidden;
  overflow-wrap: normal;
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