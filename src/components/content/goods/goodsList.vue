<template>
  <div class="goodsList">
    <goods-list-item v-for="item in goods" :key="item.id" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from "./goodsListItem.vue";
export default {
  name: "goodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>