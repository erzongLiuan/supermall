<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scrollPosition"
      :pull-up-load="true"
      @upLoadMore="upLoadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabclick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="BackClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./homeComps/HomeSwiper.vue";
import RecommendView from "./homeComps/RecommendView.vue";
import FeatureView from "./homeComps/FeatureView.vue";

// import NavBar from "components/common/navbar/NarBar";
import NavBar from "../../components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/goodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //
    this.getHomeMultidata();

    //
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    //
    this.$bus.$on("itemImageLoad", () => {
      // console.log("--------");
      this.$refs.scroll.refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    BackClick() {
      this.$refs.scroll.scrollTo(0, 0);
      // console.log("back");
    },
    scrollPosition(position) {
      // console.log(position);
      this.isShowBackTop = position.y < -1000;
    },
    upLoadMore() {
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>