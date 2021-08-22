<template>
  <div id="tabBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabBar",
};
</script>

<style>
#tabBar {
  display: flex;
  background-color: #f6f6f6;

  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>