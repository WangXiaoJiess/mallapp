<template>
  <div>
    <van-sticky>
      <van-nav-bar title="商品分类" />
      <van-search @focus="goto('/search')" class="search" placeholder="请输入需要搜索的商品" />
    </van-sticky>
    <van-row>
      <van-col span="5">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            class="oneList"
            v-for="(item,index) in oneList"
            :key="index"
            :title="item.cat_name"
            @click="oneClick(item)"
          />
        </van-sidebar>
      </van-col>
      <van-col span="19">
        <div class="ListTitle">
          <div
            @click="onClick(index)"
            :class="{'active' :index == allindex}"
            v-for="(item,index) in ListTitle"
            :key="index"
          >{{item.title}}</div>
        </div>
        <div class="List">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :offset="10"
            @load="onLoad"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <div class="category_List">
                <CartList v-for="(item,index) in TwoList" :key="index" :ListItem="item" />
              </div>
            </van-pull-refresh>
          </van-list>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getCatsTree, getCadGoods } from "../../api/api";
import CartList from "../../components/CartList";
export default {
  data() {
    return {
      activeKey: 0,
      oneList: [],
      ListTitle: [
        {
          title: "综合",
        },
        {
          title: "销量",
        },
        {
          title: "新品",
        },
      ],
      allindex: 0,
      TwoList: [],
      isLoading: false,
      loading: false,
      finished: false,
      id: 85,
      page: 1,
    };
  },
  components: {
    CartList,
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    onClick(index) {
      this.allindex = index;
    },
    oneClick(item) {
      // console.log(item)
      this.id = item.cat_id;
      getCadGoods({ cat_id: this.id }).then((res) => {
        this.TwoList = [...res.data];
      });
      this.finished = false;
    },
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        getCadGoods({ cat_id: 85 }).then((res) => {
          this.TwoList = [...res.data];
        });
        this.activeKey = 0;
        this.isLoading = false;
        this.finished = false;
      }, 1000);
    },
    onLoad() {
      // this.loading = true;
      getCadGoods({ cat_id: this.id, page: this.page }).then((res) => {
        this.TwoList = [...this.TwoList, ...res.data];
      });
      this.loading = false;

      // 数据全部加载完成
      if (this.TwoList.length >= 40) {
        this.finished = true;
      }
    },
  },
  mounted() {
    getCatsTree().then((res) => {
      // console.log(res.data)
      this.oneList = [...res.data];
    });
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 98%;
  position: relative;
  top: 0px;
  padding: 2px 12px;
  border: 1px solid gray;
  margin: 0 auto;
}
.oneList {
  padding: 32px 12px;
}
.ListTitle {
  width: 100%;
  padding: 30px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.active {
  color: red;
}
.category_List {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.List {
  width: 100%;
  height: 960px;
  overflow: scroll;
}
</style>