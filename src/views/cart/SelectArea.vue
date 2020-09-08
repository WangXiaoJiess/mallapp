<template>
  <div>
    <van-nav-bar
      title="更换收货地址"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      add-button-text="选择该地址"
      @select="select"
    />
  </div>
</template>

<script>
import { getArea } from "../../api/api";
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      index: 0,
    };
  },
  mounted() {
    getArea().then((res) => {
      console.log(res.data);
      this.list = res.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/buyGoods",
      });
    },
    onClickRight() {
      this.$router.push({
        path: "/area",
      });
    },
    onAdd() {
      this.$router.push({
        path: "/buyGoods",
        query: {
          index: this.index,
        },
      });
    },
    onEdit() {},
    select(item, index) {
      console.log(index);
      this.index = index;
    },
  },
};
</script>

<style>
</style>