<template>
  <!-- <div class="d-flex  align-baseline"> -->
  <!-- <v-card
    width="100%"
    height="56px"
    class="d-flex align-baseline ma-0"
    outlined
  > -->
  <v-text-field
    v-model="text"
    placeholder="メッセージをおくる"
    single-line
    hide-details
    dense
    solo
    prepend-inner-icon="mdi-plus-box"
    :rules="rules.counter"
    @keydown.enter.stop="commit"
    @click:prepend-inner.stop="commit"
  ></v-text-field>
  <!-- <v-btn text height="100%" min-width="88px" @click="commit">送る</v-btn> -->
  <!-- </v-card> -->
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import firebase from "../plugins/firebase"
import { firestore } from "firebase"
import * as uuidv4 from "uuid/v4"

export default {
  data() {
    return {
      text: ``,
      nowtextkey: null,
      rules: {
        counter: [(v: string) => v.length <= 60 || "60文字までです"]
      }
    }
  },
  computed: {
    roomname() {
      return this.$store.state.room.roomname
    }
  },
  watch: {
    text() {
      // console.log(this.text)
      const messagesDocRef = firebase
        .firestore()
        .collection(`${this.roomname}-messages`)

      if (!this.nowtextkey) {
        if (!this.text) return

        this.nowtextkey = uuidv4()
        console.log(messagesDocRef)
        messagesDocRef.doc(this.nowtextkey).set({
          text: this.text,
          isWriting: true,
          createTime: firestore.Timestamp.now().seconds
        })
      } else {
        if (this.text) {
          messagesDocRef.doc(this.nowtextkey).update({
            text: this.text,
            isWriting: true
          })
        } else {
          messagesDocRef.doc(this.nowtextkey).delete()
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
        .firestore()
        .collection(`${this.roomname}-messages`)
        .doc(`${this.nowtextkey}`)
        .update({
          // text: this.text,
          isWriting: false
        })
      this.nowtextkey = null
      this.text = ``
    },
    deleteExpiredMessage(expiredTimeSec = 100) {
      const nowSec = firebase.firestore.Timestamp.now().seconds
      firebase
        .firestore()
        .collection(`${this.$route.params.roomname}-messages`)
        .where(`isWriting`, `==`, true)
        // .where(`createTime`, `<=`, nowSec - expiredTimeSec)
        .get()
        .then(msgs => {
          let msgsToDelete = []
          for (const msg of msgs.docs) {
            if (msg.data().createTime <= nowSec - expiredTimeSec) {
              msgsToDelete.push(msg.id)
            }
          }
          for (const key of msgsToDelete) {
            firebase
              .firestore()
              .doc(`${this.$route.params.roomname}-messages/${key}`)
              .delete()
          }
        })
    }
  }
}
@Component
export class ProgramInfoCard extends Vue {}
</script>

<style scoped></style>
