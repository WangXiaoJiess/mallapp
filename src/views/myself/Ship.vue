<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="areaList" v-for="(item,index) in areaList" :key="index">
      <div class="areaList_left">
        <img src="../../assets/buyGoods_img.png" alt />
      </div>
      <div class="areaList_main">
        <p>
          <b>{{item.name}}</b>
          <span>{{item.phone}}</span>
        </p>
        <p>
          <span>{{item.province}}</span>
          <span>{{item.city}}</span>
          <span>{{item.district}}</span>
          <span>{{item.address}}</span>
        </p>
      </div>
      <div class="areaList_right">
        <van-button plain type="info" @click="onClick(item)">编辑</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getArea } from "../../api/api";
export default {
  metaInfo: {
    title: "我的收货地址",
  },
  data() {
    return {
      areaList: [],
    };
  },
  created() {
    getArea().then((res) => {
      console.log(res.data);
      this.areaList = res.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/myself",
      });
    },
    onClickRight() {
      this.$router.push({
        path: "/area",
      });
    },
    onClick(item) {
      // console.log(item)
      this.$router.push({
        path: "/editArea",
        query: {
          item,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.areaList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid gray;
  .areaList_main {
    width: 60%;
  }
  .areaList_left {
    width: 20%;
  }
  .areaList_right {
    width: 20%;
  }
}
</style>