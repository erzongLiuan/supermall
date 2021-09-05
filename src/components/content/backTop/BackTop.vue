<template>
  <div class="BackTop">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style>
.BackTop {
  position: fixed;
  bottom: 45px;
  right: 15px;
  z-index: 1000;
}
.BackTop img {
  width: 45px;
  height: 45px;
}
</style>