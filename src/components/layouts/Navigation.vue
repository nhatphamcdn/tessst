<template>
  <!-- color="#fafbfd" -->
  <v-navigation-drawer
    app
    permanent
    class="menu-navigation-drawer"
    :mini-variant="enableMini"
    :expand-on-hover="enableMini"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-title class="title text-h4">
          {{ config.menuTitle }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <menu-group :menus="menus" :enable-mini="enableMini" />
  </v-navigation-drawer>
</template>

<script>
import MenuGroup from "./MenuGroup.vue";
import { SYSTEM_CONFIG as config } from "@/config/app.config";

export default {
  name: "LayoutNavigation",
  components: { MenuGroup },
  props: {
    enableMini: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    config,
    menus: [],
  }),
  mounted() {
    // this.menus = this.$store.state.menu.menus;
  },
};
</script>

<style scoped>
.menu-navigation-drawer {
  z-index: 9999;
}
</style>
