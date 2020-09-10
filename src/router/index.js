import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layouts/Index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: { title: '首页', keepAlive: true, isshow: true }
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/category/Category'),
        meta: { title: '商品分类', keepAlive: false, isshow: true }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/cart/Cart'),
        meta: { title: '购物车', keepAlive: true, isshow: false }
      },
      {
        path: '/myself',
        name: 'Myself',
        component: () => import('@/views/myself/Myself'),
        meta: { title: '个人中心', keepAlive: false, isshow: true },
      }
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/detail/Detail'),
    meta: { title: '详情', keepAlive: false }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/Search'),
    meta: { title: '搜索', keepAlive: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
    meta: { title: '登录', keepAlive: false }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/myself/Setting'),
    meta: { title: '设置', keepAlive: false }
  },
  ,
  {
    path: '/buyGoods',
    name: 'BuyGoods',
    component: () => import('@/views/cart/BuyGoods'),
    meta: { title: '确认订单', keepAlive: false }
  },
  {
    path: '/ship',
    name: 'Ship',
    component: () => import('@/views/myself/Ship'),
    meta: { title: '收货地址', keepAlive: false }
  },
  {
    path: '/area',
    name: 'Area',
    component: () => import('@/views/myself/Area'),
    meta: { title: '新增收货地址', keepAlive: false }
  },
  {
    path: '/editArea',
    name: 'EditArea',
    component: () => import('@/views/myself/EditArea'),
    meta: { title: '修改收货地址', keepAlive: false }
  },
  {
    path: '/selectArea',
    name: 'SelectArea',
    component: () => import('@/views/cart/SelectArea'),
    meta: { title: '更换收货地址', keepAlive: false }
  },
  {
    path: '/payOrder',
    name: 'PayOrder',
    component: () => import('@/views/cart/PayOrder'),
    meta: { title: '确定订单', keepAlive: false }
  },
  {
    path: '/payOrderIsOK',
    name: 'PayOrderIsOK',
    component: () => import('@/views/cart/PayOrderIsOK'),
    meta: { title: '支付成功', keepAlive: false }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/Order'),
    meta: { title: '我的订单', keepAlive: false }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) {
  if (!store.state.token) {
    if (to.path !== '/login') {
      next('/login')
    }
  } else {
    if (to.path == '/login') {
      next('/home')
    }
  }
  next()
})

router.beforeEach((to, from, next) => {
  // console.log(from)
  store.state.path = from.path
  if (from.path == '/detail') {
    store.dispatch('setid', from.query.id)
  }
  store.commit('setpath', from.path)
  next()
})

export default router
