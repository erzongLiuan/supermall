<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" ref="nav" @itemsClick="itemsClick" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!-- 属性:topImage 传入值:top-image -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
      <back-top @click.native="BackClick" v-show="isShowBackTop" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childcomps/DetailNavBar.vue";
import DetailSwiper from "./childcomps/DetailSwiper.vue";
import DetailShopInfo from "./childcomps/DetailShopInfo.vue";
import DetailBaseInfo from "./childcomps/DetailBaseInfo.vue";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childcomps/DetailParamInfo.vue";
import DetailCommentInfo from "./childcomps/DetailCommentInfo.vue";
import DetailBottomBar from "./childcomps/DetailBottomBar.vue";
import GoodsList from "components/content/goods/goodsList";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  // 加入混入
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      scrollIntervalIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2. 根据iid请求数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4. 保存商品详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6. 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    }, 200);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.newRefresh();
      this.getThemeTopYs();
    },
    itemsClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 判断回到顶部在哪里出现
      this.isShowBackTop = position.y < -1000;

      const positionY = -position.y;
      if (positionY <= this.themeTopYs[1]) {
        this.scrollIntervalIndex = 0;
      } else if (positionY <= this.themeTopYs[2]) {
        this.scrollIntervalIndex = 1;
      } else if (positionY <= this.themeTopYs[3]) {
        this.scrollIntervalIndex = 2;
      } else {
        this.scrollIntervalIndex = 3;
      }
      // console.log(this.scrollIntervalIndex);
      this.$refs.nav.currentIndex = this.scrollIntervalIndex;
    },
    addToCart() {
      // 1.获取购物车里需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.nav-bar {
  position: relative;
  z-index: 11;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>