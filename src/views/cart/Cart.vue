<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll";
import CartList from "./cartChild/cartList.vue";
import CartBottomBar from "./cartChild/cartBottomBar.vue";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 11;
}
.cart {
  height: 100vh;
  overflow: hidden;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
}
</style>