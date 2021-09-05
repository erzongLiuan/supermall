import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null,
        }
    },
    mounted() {
        // 图片加载完成的事件监听
        // 防抖
        this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
        // 每张图片加载成功后，都调用refresh函数
        // 对监听的时间进行保存
        this.itemImgListener = () => {
            this.newRefresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgListener);
        // console.log('mixin');
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop,
    },
    methods: {
        BackClick() {
            this.$refs.scroll.scrollTo(0, 0);
            // console.log("back");
        },
    }
}