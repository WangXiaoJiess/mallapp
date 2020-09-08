<template>
  <div>
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <van-button class="van-button" type="default" @click="onClick" block>切换账号</van-button>
    <van-button class="van-button" type="default" block>注销登录</van-button>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setToken: "setToken"
    }),
    onClickLeft() {
      this.$router.push("/myself");
    },
    onClick() {
      Dialog.confirm({
        title: "退出确认",
        message: "该操作将退出登录，是否继续？",
      })
        .then(() => {
          // on confirm
          this.setToken("")
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.van-button {
  margin: 30px 0px;
}
</style>