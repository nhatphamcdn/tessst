<template>
  <div class="v-application--wrap">
    <navigation :enable-mini="enableMini" />
    <v-app-bar app dense class="app-bar" elevation="0">
      <v-app-bar-nav-icon small @click.stop="enableMini = !enableMini">
        Icon toggle
      </v-app-bar-nav-icon>
      <v-breadcrumbs
        v-if="config.breadcrumb"
        :items="breadCrumbs"
      ></v-breadcrumbs>

      <v-toolbar-title v-if="config.toolbarTitle">
        <div class="system-title" v-if="config.systemTitle">
          {{ config.systemTitle }}
        </div>
      </v-toolbar-title>

      <v-spacer />

      <v-btn @click="$vuetify.lang.current = 'en'">EN</v-btn>
      <v-btn @click="$vuetify.lang.current = 'th'">TH</v-btn>
      <v-menu
        bottom
        offset-y
        rounded="0"
        transition="scale-transition"
        origin="bottom"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-1" small icon v-bind="attrs" v-on="on">
            <v-avatar color="#b9cdef" size="32">
              <img v-if="userAvatar" :src="userAvatar" alt="" />
              <span v-else class="white--text text-h6">
                {{ currentUser }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(operation, index) in actions"
            :key="index"
            @click="doAction(operation)"
          >
            <v-list-item-title>{{
              operation.text || operation.action
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <visited-bar />
      </template>
    </v-app-bar>

    <v-main class="main-content">
      <v-container fluid>
        <transition name="slide-left" appear>
          <router-view class="main-router-view" :key="routerKey" />
        </transition>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Navigation from "@/components/layouts/Navigation.vue";
import VisitedBar from "@/components/layouts/VisitedBar.vue";
import { createBreadCrumbs } from "@/utils/layout.util";
import { SYSTEM_CONFIG as config } from "@/config/app.config";

export default {
  name: "DefaultLayout",
  components: {
    Navigation,
    VisitedBar,
  },
  data: () => ({
    config,
    enableMini: false,
    enableSearch: false,
    actions: [
      {
        text: "Profile",
        action: "/profiles",
      },
      {
        text: "Logout",
        action: "logout",
        method: true,
      },
    ],
  }),
  computed: {
    toggleNavIcon() {
      return this.enableMini
        ? "mdi-format-indent-increase"
        : "mdi-format-indent-decrease";
    },
    currentUser() {
      return "ABC";
    },
    routerKey() {
      return this.$route.meta.id;
    },
    breadCrumbs() {
      return createBreadCrumbs(this.$route);
    },
    userAvatar() {
      // const userInfo = this.$store.state.user.userOnlineInfo;
      // return userInfo.avatar;
      return null;
    },
  },
  methods: {
    doAction(operation) {
      if (operation.method) {
        this[operation.action]();
      } else {
        this.$router.push(operation.action);
      }
    },
    logout() {
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          this.refreshCaptcha();
          console.log(err);
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "./DefaultLayout";
</style>
