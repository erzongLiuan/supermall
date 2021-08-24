<template>
  <div class="tabBar-item" @click="btnClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-activated"></slot></div>
    <div :style="isActiveColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabBar-item",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // 动态决定显示当前活跃的路由
      // 用当前活跃的路由的路径与各个路由组件的路径进行比较，路径相等的为true 不相等为false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 在app组件中修改activeColor属性就可以控制当前活跃的路由组件所显示的颜色
    // 首先通过isActive确定哪个组件活跃，然后改变颜色
    isActiveColor() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    btnClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tabBar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabBar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>