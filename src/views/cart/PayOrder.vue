<template>
  <div>
    <van-nav-bar title="确认订单" fixed left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/buyGoods",
      });
    },
  },
};
</script>

<style>
</style>