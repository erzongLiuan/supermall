<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in getCartList"
      :key="index"
      :item-info="item"
    />
  </div>
</template>

<script>
import CartListItem from "./cartListItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "cartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["getCartList"]),
  },
};
</script>

<style>
</style>