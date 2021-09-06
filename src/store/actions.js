export default {
    addCart(context, payload) {
        // 判断cartList中是否有和传过来的payload一样的对象
        // let oldProduct = null
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item
        //     }
        // }
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        // 有的话，相同的对象count+1，没有的话，push
        if (oldProduct) {
            context.commit('addCounter', oldProduct)
        } else {
            payload.count = 1
            context.commit('addToCart', payload)
        }
    }
}