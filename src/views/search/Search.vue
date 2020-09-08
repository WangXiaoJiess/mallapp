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
        <div v-for="(item,index) in SearchHot" :key="index">{{item}}</div>
      </div>

      <div v-show="history.length>0">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索历史</van-divider>
        <van-cell v-for="(item,index) in history" :key="index" :title="item">
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
          <CartList v-for="(item,index) in SearchList" :key="index" :ListItem="item" />
        </div>
      </van-list>
    </div>
    <div class="hidder"></div>
  </div>
</template>

<script>
import { getSearchHot, getGoods } from "../../api/api";
import CartList from "../../components/CartList";
export default {
  data() {
    return {
      allindex: 0,
      value: "",
      SearchHot: [],
      history: [],
      SearchList: [],
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
  methods: {
    onClickLeft() {
      this.$router.push(this.$store.state.path);
    },
    onSearch() {
      let a = true
      this.history.forEach((element)=>{
        if(element == this.value){
          a = false
        }
      })
      if(a){
        this.history.unshift(this.value);
      }
      getGoods({ goodsName: this.value }).then((res) => {
        // console.log(res.data);
        this.SearchList = [...res.data];
      });
      this.isShow = false;
    },
    onClick(index) {
      this.history.splice(index, 1);
    },
    del() {
      this.history = [];
    },
    onfocus() {
      if (this.isShow == false) {
        this.isShow = true;
      }
    },
    onClick_ListTitle(index) {
      this.allindex = index;
    },
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
  },
  mounted() {
    getSearchHot().then((res) => {
      // console.log(res.data)
      this.SearchHot = [...res.data];
    });
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
.hidder{
  height: 80px;
}
</style>