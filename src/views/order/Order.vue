<template>
  <div>
    <van-nav-bar :title="$route.meta.title" fixed left-arrow @click-left="onClickLeft" />
    <div class="hidder"></div>
    <van-tabs v-model="active" animated>
      <van-tab title="全部">
        <div v-for="(item,index) in List" :key="index">
          <van-cell-group>
            <van-cell :title="item[1].shopName" value="内容" />
          </van-cell-group>
          <van-card
            :num="item[2].num"
            :price="item[2].goodsPrice"
            :title="item[2].goodsName"
            :thumb="item[2].goodsLogo"
          />
        </div>
      </van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="待评价"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getOrderByState } from "../../api/api";
export default {
  metaInfo: {
    title: "我的订单",
  },
  data() {
    return {
      active: 0,
      List: [],
    };
  },
  mounted() {
    getOrderByState({
      orderState: "9",
      page:"1",
      pageSize: "50",
    }).then((res) => {
      console.log(res.data);
      this.List = res.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push("/myself");
    },
  },
};
</script>

<style>
.hidder {
  width: 100%;
  height: 100px;
}
</style>