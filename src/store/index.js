import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCart(state, payload) {
            // 判断cartList中是否有和传过来的payload一样的对象
            // let oldProduct = null
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }
            let oldProduct = state.cartList.find(item => item.iid === payload.iid)

            // 有的话，相同的对象count+1，没有的话，push
            if (oldProduct) {
                oldProduct.count += 1
            } else {
                payload.count = 1
                state.cartList.push(payload)
            }
        }
    },
})

//3.挂载到vue实例中
export default store