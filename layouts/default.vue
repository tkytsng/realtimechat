<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar style="width: 100%" fixed app>
      <div style="margin: 0 auto;width: 100%; max-width: 600px;">
        <v-text-field
          v-if="isHome"
          dense
          solo
          single-line
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
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer absolute app>
      <span>&copy; 2019</span>
    </v-footer>-->
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
      textvalue: ""
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
      this.$router.push(`/rooms/${this.textvalue}`)
    }
  }
}
</script>
