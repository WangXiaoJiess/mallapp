import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { getCart, patchDeleteCart, } from "../api/api";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage
  })],
  state: {
    token: "", // 响应头
    path: '', // 路由对象
    CartList: [],  // 购物车列表
    totle: 0, // 购物车总价
    checked: false,  // 购物车全选按钮
    id: 0, // 详情id
    OrderList: [], // 订单列表
    signindex: 0, // 我的页面  签到
    history: [], // 搜索历史记录
  },
  mutations: {
    // 获取响应头
    setToken(state, val) {
      state.token = val;
    },
    // 获取  我的页面  签到
    setsignindex(state, newsignindex) {
      state.signindex = newsignindex
    },
    // 获取路由对象
    setpath(state, newpath) {
      state.path = newpath
    },
    // 获取详情id
    setid(state, newid) {
      state.id = newid
    },
    // 获取订单列表
    setOrderList(state, newOrderList) {
      state.OrderList = newOrderList
    },
    // 获取购物车数据
    setCartList(state) {
      getCart({ pageSize: '30' }).then((res) => {
        console.log(res.data);
        var index = res.data.length - 1
        if (res.data[index] == null) {
          res.data.pop()
        }
        state.CartList = res.data;
        // 总价
        state.totle = 0
        state.CartList.forEach(element => {
          if (element.ischecked == true) {
            element.ischecked = false
          }
        })
      });
    },
    // 购物车总价事件
    settotle(state) {
      state.totle = 0
      state.CartList.forEach(element => {
        if (element.ischecked == true) {
          state.totle += element.price * element.product_amount * 100
        }
      })
    },
    // 购物车删除事件
    setdel(state) {
      var a = []
      state.CartList.forEach(element => {
        if (element.ischecked == true) {
          console.log(element)
          a.push(element.cart_id)
        }
      })
      var str = a.join(',')
      patchDeleteCart({ carid: str }).then(res => {
        console.log(res)
      })
      // 请求购物车数据
      getCart({ pageSize: '30' }).then((res) => {
        // console.log(res.data);
        state.CartList = res.data;
        // 总价
        state.totle = 0
        state.CartList.forEach(element => {
          if (element.ischecked == true) {
            state.checked = true
            state.totle += element.price * element.product_amount * 100
          }
        })
      });
    },
    // 购物车全选按钮事件
    setchecked(state) {
      state.checked = !state.checked
      state.CartList.forEach((element) => {
        element.ischecked = state.checked;
      });
    },
    // 购物车单选按钮事件
    setchange(state) {
      // 当数组中数据全部为true就为true，当数组中数据全部为false就为false，
      if (
        state.CartList.findIndex((target) => target.ischecked === false) == -1
      ) {
        state.checked = true;
      } else {
        state.checked = false;
      }
    }
  },
  actions: {
    setCartList(context) {
      context.commit('setCartList')
    },
    settotle(context) {
      context.commit('settotle')
    },
    setdel(context) {
      context.commit('setdel')
    },
    setchecked(context) {
      context.commit('setchecked')
    },
    setchange(context) {
      context.commit('setchange')
    },
    setid(context, newid) {
      context.commit('setid', newid)
    },
    setsignindex(context, newsignindex) {
      context.commit("setsignindex", newsignindex)
    }
  },
  modules: {
  }
})
