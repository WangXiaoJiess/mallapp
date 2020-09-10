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
    token: "",
    path: '', // 路由对象
    CartList: [],  // 购物车列表
    totle: 0, // 购物车总价
    checked: false,  // 购物车全选按钮
    id: 0,
    OrderList: [], // 订单列表
    signindex: 0, // 我的页面  签到
  },
  mutations: {
    setToken(state, val) {
      state.token = val;
    },
    setsignindex(state, newsignindex) {
      state.signindex = newsignindex
    },
    setpath(state, newpath) {
      state.path = newpath
    },
    setid(state, newid) {
      state.id = newid
    },
    setOrderList(state, newOrderList) {
      state.OrderList = newOrderList
    },
    setCartList(state) {
      getCart({ pageSize: '30' }).then((res) => {
        console.log(res.data);
        res.data.pop()
        state.CartList = res.data;
        state.totle = 0
        state.CartList.forEach(element => {
          if (element.ischecked == true) {
            element.ischecked = false
          }
        })
      });
    },
    settotle(state) {
      state.totle = 0
      state.CartList.forEach(element => {
        if (element.ischecked == true) {
          state.totle += element.price * element.product_amount * 100
        }
      })
    },
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
      getCart({ pageSize: '30' }).then((res) => {
        // console.log(res.data);
        var index = res.data.length - 1
        res.data.splice(index, 1)
        state.CartList = res.data;
        state.totle = 0
        state.CartList.forEach(element => {
          if (element.ischecked == true) {
            state.checked = true
            state.totle += element.price * element.product_amount * 100
          }
        })
      });
    },
    setchecked(state) {
      state.checked = !state.checked
      state.CartList.forEach((element) => {
        element.ischecked = state.checked;
      });
    },
    setchange(state) {
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
