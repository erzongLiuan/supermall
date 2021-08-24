<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <!-- 在这里使用别名assets时，必须在前面加~ -->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
        <img
          slot="item-icon-activated"
          src="~assets/img/tabbar/home_active.svg"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />
        <img
          slot="item-icon-activated"
          src="~assets/img/tabbar/category_active.svg"
          alt=""
        />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="cart">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
        <img
          slot="item-icon-activated"
          src="~assets/img/tabbar/shopcart_active.svg"
          alt=""
        />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
        <img
          slot="item-icon-activated"
          src="~assets/img/tabbar/profile_active.svg"
          alt=""
        />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
// 在webpack.base.conf.js中给components起了别名。
import tabBar from "components/common/tabbar/tabBar.vue";
import tabBarItem from "components/common/tabbar/tabBarItem.vue";
export default {
  name: "mainTabbar",
  components: {
    tabBar,
    tabBarItem,
  },
};
</script>

<style scoped>
</style>