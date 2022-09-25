<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <v-app id="app">
    <v-container>
      Locale
      <v-btn @click="$vuetify.lang.current = 'en'">EN</v-btn>
      <v-btn @click="$vuetify.lang.current = 'th'">TH</v-btn>
      <router-view />
    </v-container>
  </v-app>
</template>
