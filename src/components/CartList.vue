<template>
  <div class="CartList" @click="onClick(ListItem)">
    <div>
      <img width="100%" class="CartList_image" :src="ListItem.goodsLogo" alt />
    </div>
    <div class="van-ellipsis" style="font-size:12px">{{ListItem.goodsName}}</div>
    <div style="font-size:12px;text-align:center">
      <span style="color:pink;padding: 0px 20px 0px 0px;display: inline-block;">￥{{ListItem.goodsPrice}}</span>
      <span>
        <van-icon name="star-o" />
        {{ListItem.goodsFav}}
      </span>
    </div>
    <div>
      <s class="size">{{ListItem.goodsOldPrice}}</s>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ListItem: Object,
  },
  methods: {
    onClick(item) {
      this.$emit("onClick", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.CartList {
  width: 46%;
}
.CartList_image {
  border-radius: 10px;
}
.size{
  color: rgb(170, 170, 169);
  font-size: 12px;
}
</style>