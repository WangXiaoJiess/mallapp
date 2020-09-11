<template>
  <div>
    <!-- 为true时缓存组件 -->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <!-- 为false时不缓存组件 -->
    <router-view v-else></router-view>
    <!-- 为true时显示底部导航 -->
    <div v-if="$route.meta.isshow">
      <div class="hidder"></div>
      <van-tabbar v-model="active" route>
        <van-tabbar-item
          v-for="(item,index) in data"
          :key="index"
          :icon="item.icon"
          :to="item.to"
        >{{item.title}}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      data: [
        {
          title: "首页",
          icon: "wap-home-o",
          to: "/home",
        },
        {
          title: "商城",
          icon: "apps-o",
          to: "/category",
        },
        {
          title: "购物车",
          icon: "cart-o",
          to: "/cart",
        },
        {
          title: "我的",
          icon: "user-o",
          to: "/myself",
        },
      ],
    };
  },
};
</script>

<style scoped>
.hidder {
  height: 100px;
}
</style>
