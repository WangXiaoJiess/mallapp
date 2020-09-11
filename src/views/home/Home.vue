<template>
  <div>
    <!-- 吸顶效果 -->
    <van-sticky>
      <img width="100%" src="../../assets/logo.png" alt />
      <van-search @focus="goto('/search')" class="search" placeholder="请输入需要搜索的商品" />
    </van-sticky>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in HomeList[1]" :key="index">
            <img width="100%" :src="item.slide_show_imgUrl" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="Home_nav">
        <div class="nav_Item" v-for="(item,index) in HomeList[0]" :key="index">
          <img width="100%" :src="item.sp_home_ico" alt />
          <div>{{item.sp_home_title}}</div>
        </div>
      </div>
      <!-- 吸顶效果 -->
      <van-sticky :offset-top="93">
        <div class="Home_title">
          <div
            @click="oneClick(item,index)"
            :class="{'active' :index == allindex}"
            v-for="(item,index) in ShowGoodsTitle"
            :key="index"
          >{{item.title}}</div>
        </div>
      </van-sticky>
      <!-- 上拉加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="0"
        @load="onLoad"
      >
      <!-- 商品组件 -->
        <div class="Home_List">
          <CartList
            v-for="(item,index) in ShowGoods"
            :key="index"
            :ListItem="item"
            @onClick="onClick"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 引入vant组件
import { Toast } from "vant";
// 引入axios接口
import { getHomeList, getShowGoods } from "../../api/api";
// 引入商品组件
import CartList from "../../components/CartList";
export default {
  metaInfo: {
    title: "首页",
  },
  data() {
    return {
      HomeList: [],
      ShowGoods: [],
      ShowGoodsTitle: [
        {
          title: "流行",
          sort: "syn",
        },
        {
          title: "新款",
          sort: "new",
        },
        {
          title: "精选",
          sort: "sell",
        },
      ],
      allindex: 0,
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      sort: "syn",
    };
  },
  // 组件注册
  components: {
    CartList,
  },
  // 初始化
  created() {
    getHomeList()
      .then((res) => {
        // console.log(res.data);
        this.HomeList = [...res.data];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 商品头部点击事件
    oneClick(item, index) {
      this.allindex = index;
      this.sort = item.sort;
      getShowGoods({ page: 1, sortType: item.sort })
        .then((res) => {
          // console.log(res.data);
          this.ShowGoods = [...res.data];
          this.finished = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        getShowGoods({ page: 1, sortType: "syn" })
          .then((res) => {
            // console.log(res.data);
            this.ShowGoods = [...res.data];
          })
          .catch((error) => {
            console.log(error);
          });
        this.allindex = 0;
        this.finished = false;
        this.isLoading = false;
        Toast("刷新成功");
      }, 1000);
    },
    // 上拉加载
    onLoad() {
      getShowGoods({ page: this.page, sortType: this.sort })
        .then((res) => {
          // console.log(res.data);
          this.ShowGoods = [...this.ShowGoods, ...res.data];
          this.loading = false;
          this.page++;
        })
        .catch((error) => {
          console.log(error);
        });
      // 加载数据不能大于40条
      if (this.ShowGoods.length >= 40) {
        this.finished = true;
      }
    },
    // 跳转到搜索路由
    goto(path) {
      this.$router.push(path);
    },
    // 跳转到详情路由
    onClick(item) {
      // console.log(item)
      this.$router.push({
        path: "/detail",
        query: {
          id: item.goodsId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Home_nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom: 20px solid rgb(218, 213, 213);
  .nav_Item {
    padding: 2%;
    width: 14%;
    text-align: center;
  }
}
.Home_title {
  width: 100%;
  padding: 30px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
}
.Home_List {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.active {
  color: red;
}
.search {
  width: 98%;
  position: relative;
  top: -8px;
  padding: 2px 12px;
  border: 1px solid gray;
  margin: 0 auto;
  background-color: white;
}
</style>