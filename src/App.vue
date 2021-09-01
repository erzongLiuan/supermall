<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tabbar />
  </div>
</template>

<script>
import mainTabbar from "components/content/mainTabbar/mainTabbar.vue";
export default {
  name: "App",
  components: { mainTabbar },
};
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
