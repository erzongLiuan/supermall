<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="(item, index)"
          class="titleItems"
          :class="{ active: index === currentIndex }"
          @click="itemsClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemsClick(index) {
      this.currentIndex = index;
      this.$emit("itemsClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
}
.titleItems {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.left {
  margin-top: 3px;
  margin-left: 3px;
}
</style>