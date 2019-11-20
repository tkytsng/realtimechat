<template>
  <v-app>
    <v-app-bar style="width: 100%" tile color="white" elevation="2" fixed app>
      <div style="margin: 0 auto;width: 100%; max-width: 600px;">
        <v-text-field
          v-if="isHome"
          dense
          outlined
          hide-details
          v-model="textvalue"
          placeholder="部屋をつくる"
          prepend-inner-icon="mdi-plus-box"
          @click:prepend-inner.stop="createRoom"
          @keydown.enter="createRoom"
          style="width:100%"
        ></v-text-field>
        <message-field v-else style="width:100%" />
      </div>
      <!-- <v-spacer class="flex-grow-0 flex-shrink-1" /> -->
    </v-app-bar>
    <v-content>
      <v-container v-scroll="onScroll" id="aaa">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import MessageField from "~/components/MessageField.vue"
export default {
  components: {
    MessageField
  },
  data() {
    return {
      textvalue: "",
      offsetTop: 0
    }
  },
  computed: {
    pagename() {
      return this.$route.name
    },
    isHome() {
      return this.pagename === "index"
    },
    title() {
      if (this.isHome) return "Home"
      else return this.$route.query.id
    }
  },
  created() {
    // console.log(this.$route)
  },
  methods: {
    async createRoom() {
      if (!this.textvalue) return

      await this.$store.dispatch(`createNewRoom`, this.textvalue)
      // this.$router.push(`/room/${this.textvalue}`)
      this.$router.push({ path: `/room`, query: { id: this.textvalue } })
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    }
  }
}
</script>
