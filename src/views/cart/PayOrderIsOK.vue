<template>
  <div class="box">
    <van-nav-bar :title="$route.meta.title" fixed left-arrow @click-left="onClickLeft" />
    <div class="hidder"></div>
    <div class="box_img">
      <img width="100%" class="img" src="http://hj0819.top/img/icon-pitch.6a0c5811.png" alt />
    </div>
    <div>
      <b>支付成功</b>
    </div>
    <div class="box_bottom">订单支付成功 请确认</div>
    <div class="box_button">
      <van-button type="primary" @click="onClick" block>查看订单</van-button>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "支付完成",
  },
  methods: {
    onClickLeft() {
      this.$router.push("/cart");
    },
    onClick() {
      this.$router.push("/order");
    },
  },
};
</script>

<style lang="scss" scoped>
.hidder {
  height: 100px;
  width: 100%;
}
.box {
  text-align: center;
}
.box_img {
  width: 25%;
  margin: 100px auto;
}
.box_bottom {
  margin-bottom: 100px;
}
.box_button {
  width: 90%;
  margin: 0 auto;
}
</style>