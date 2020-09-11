<template>
  <div>
    <van-sticky>
      <van-nav-bar title="商品搜索" left-arrow @click-left="onClickLeft" border />
      <van-search
        v-model="value"
        autofocus
        show-action
        label="商品名"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onfocus"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>

    <div v-show="isShow">
      <h4>全网搜索</h4>
      <div class="SearchHot">
        <div v-for="(item,index) in SearchHot" @click="onHot(item)" :key="index">{{item}}</div>
      </div>

      <div v-show="history.length>0">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索历史</van-divider>
        <van-cell v-for="(item,index) in history" :key="index" @click="onhistory(item)" :title="item">
          <template #right-icon>
            <van-icon name="cross" @click="onClick(index)" />
          </template>
        </van-cell>
        <div class="history">
          <van-button @click="del" plain type="info">清空历史记录</van-button>
        </div>
      </div>
    </div>
    <div v-show="!isShow">
      <van-sticky :offset-top="100">
        <div class="Search_title">
          <div
            @click="onClick_ListTitle(index)"
            :class="{'active' :index == allindex}"
            v-for="(item,index) in SearchListTitle"
            :key="index"
          >{{item.title}}</div>
        </div>
      </van-sticky>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="0"
        @load="onLoad"
      >
        <div class="Search_List">
          <CartList
            v-for="(item,index) in SearchList"
            :key="index"
            @onClick="onClick"
            :ListItem="item"
          />
        </div>
      </van-list>
    </div>
    <div class="hidder"></div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getSearchHot, getGoods } from "../../api/api";
import CartList from "../../components/CartList";
export default {
  metaInfo: {
    title: "搜索",
  },
  data() {
    return {
      allindex: 0,
      value: "",
      SearchHot: [], // 热搜词数组
      history: [], // 历史记录搜索
      SearchList: [], // 搜索商品数组
      isShow: true,
      SearchListTitle: [
        {
          title: "综合",
        },
        {
          title: "销量",
        },
        {
          title: "新品",
        },
        {
          title: "价格",
        },
      ],
      loading: false,
      finished: false,
      page: 1,
      sort: "syn",
    };
  },
  components: {
    CartList,
  },
  // 初始化
  created() {
    getSearchHot().then((res) => {
      this.SearchHot = [...res.data];
    });
    let a = localStorage.history;
    if (a) {
      this.history = JSON.parse(a);
    }
  },
  methods: {
    // 返回上一级路由
    onClickLeft() {
      window.history.back();
    },
    // 热搜词搜索
    onHot(item) {
      // console.log(item);
      this.value = item;
      this.onSearch();
    },
    // 历史搜索事件
    onhistory(item){
      // console.log(item)
      this.value = item;
      this.onSearch();
    },
    // 搜索事件
    onSearch() {
      let a = true;
      for (var i = 0; i < this.history.length; i++) {
        if (this.history[i] === this.value) {
          this.history.splice(i, 1); // 如果数据组存在该元素，则把该元素删除
          let a = false;
        }
      }
      if (a) {
        this.history.unshift(this.value);
      }
      // 以上是去重
      getGoods({ goodsName: this.value }).then((res) => {
        this.SearchList = [...res.data];
      });
      // 获取商品数据
      this.isShow = false;
      // 显示在页面上
      this.save();
      // 调用保存到本地事件
    },
    onClick(index) {
      this.history.splice(index, 1);
      // 删除
      this.save();
      // 调用保存到本地事件
    },
    // 清空事件
    del() {
      Dialog.confirm({
        title: "",
        message: "你确定要删除吗",
      })
        .then(() => {
          this.history = [];
        })
        .catch(() => {
          // on cancel
        });
      this.save();
    },
    // 获取焦点事件
    onfocus() {
      if (this.isShow == false) {
        this.isShow = true;
      }
    },
    // 商品头部
    onClick_ListTitle(index) {
      this.allindex = index;
    },
    // 上拉加载
    onLoad() {
      getGoods({
        page: this.page,
        sortType: this.sort,
        goodsName: this.value,
      })
        .then((res) => {
          // console.log(res.data);
          this.SearchList = [...this.SearchList, ...res.data];
          this.loading = false;
          this.page++;
        })
        .catch((error) => {
          console.log(error);
        });

      if (this.SearchList.length >= 40) {
        this.finished = true;
      }
    },
    // 保存到本地事件
    save() {
      localStorage.history = JSON.stringify(this.history);
    },
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
.SearchHot {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    padding: 10px 20px;
    margin: 10px;
    border: 1px solid gray;
    color: gray;
    border-radius: 10px;
  }
}
.history {
  text-align: center;
}
.Search_List {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.Search_title {
  width: 100%;
  padding: 30px 0px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: white;
}
.active {
  color: red;
  border-bottom: 4px solid red;
}
.hidder {
  height: 80px;
}
</style>