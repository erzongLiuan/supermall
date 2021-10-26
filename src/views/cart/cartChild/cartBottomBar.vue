<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <div class="word">全选</div>
    </div>
    <div class="totalPrice">合计：{{ totalPrice }}</div>
    <div class="caculate" @click="clacClick">去结算({{ checkCount }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkCount() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      return (
        // !this.$store.state.cartList.filter((item) => !item.checked).length &&
        // 如果找到一个item里面的checked为false，即有一个没选上，则直接返回false
        !this.$store.state.cartList.find((item) => !item.checked) &&
        // 购物车为空时，全选按钮应该不选
        this.$store.state.cartList.length
      );
    },
  },
  methods: {
    // 点击全选按钮：首先判断全选按钮是否已经选上？让所有checked为false ：让所有checked为true
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    clacClick() {
      this.$toast.show("请选择商品");
      if (!this.isSelectAll) {
      }
    },
  },
};
</script>

<style>
.cart-bottom-bar {
  position: relative;
  bottom: -6px;
  display: flex;
  height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  width: 70px;
}
.check-button {
  display: flex;
  width: 20px;
  height: 20px;
  margin-top: 10px;
  margin-left: 10px;
}
.word {
  flex: 1;
  text-align: center;
  line-height: 40px;
}
.totalPrice {
  flex: 1;
  margin-right: 100px;
  text-align: center;
  line-height: 40px;
}
.caculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
</style>