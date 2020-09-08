<template>
  <div>
    <div v-show="isshow">
      <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        right-text="管理"
        @click-right="onClickRight"
        fixed
      >
        <template #title>购物车({{CartList.length}})</template>
      </van-nav-bar>
      <div class="hidder"></div>
      <van-row type="flex" align="center" v-for="(item,index) in CartList" :key="index">
        <van-col span="2">
          <van-checkbox v-model="item.ischecked" @click="onChange(item)"></van-checkbox>
        </van-col>
        <van-col span="22">
          <van-card
            :num="item.product_amount"
            :price="item.price"
            :title="item.title"
            :thumb="item.image"
          />
        </van-col>
      </van-row>
      <div class="hidder"></div>
      <van-submit-bar :price="totle" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="onChecked">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div v-show="!isshow">
      <van-nav-bar
        :title="'购物车('+CartList.length+')'"
        left-arrow
        @click-left="onClickLeft"
        right-text="完成"
        @click-right="onClickRight"
        fixed
      />
      <div class="hidder"></div>
      <van-row type="flex" align="center" v-for="(item,index) in $store.state.CartList" :key="index">
        <van-col span="2">
          <van-checkbox v-model="item.ischecked" @click="onChange(item)"></van-checkbox>
        </van-col>
        <van-col span="22">
          <van-card :price="item.price" :title="item.title" :thumb="item.image">
            <template #num>
              <van-stepper v-model="item.product_amount" :name="item.cart_id" @change="setnum" />
            </template>
          </van-card>
        </van-col>
      </van-row>
      <div class="hidder"></div>
      <div class="footer">
        <div>
          <van-checkbox v-model="checked" @click="onChecked">全选</van-checkbox>
        </div>
        <div>
          <button class="fn" @click="del">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { patchpathCartChecked, patchCartNum } from "../../api/api";
export default {
  data() {
    return {
      result: [],
      isshow: true,
    };
  },
  computed: {
    CartList: function () {
      return this.$store.state.CartList;
    },
    totle: function () {
      return this.$store.state.totle;
    },
    checked: function () {
      return this.$store.state.checked;
    },
  },
  created() {
    this.$store.dispatch("setCartList");
    console.log(this.CartList);
  },
  methods: {
    onClickLeft() {
      if (this.$store.state.path == "/buyGoods") {
        this.$router.push("/home");
      }
      this.$router.push(this.$store.state.path);
    },
    onClickRight() {
      this.isshow = !this.isshow;
    },
    onSubmit() {
      this.$router.push({
        path: "/buyGoods",
      });
    },
    onChecked() {
      this.$store.dispatch("setchecked");
      this.$store.dispatch("settotle");
    },
    onChange(item) {
      console.log(item.cart_id);
      // patchpathCartChecked({ catId: item.cart_id }).then((res) => {
      //   console.log(res);
      // });
      this.$store.dispatch("setchange");
      this.$store.dispatch("settotle");
    },
    del() {
      this.$store.dispatch("setdel");
      this.$store.dispatch("setCartList");
    },
    setnum(value, detail) {
      console.log(typeof value);
      console.log(typeof detail.name);
      patchCartNum({ catId: detail.name, product_amount: value }).then(
        (res) => {
          console.log(res);
        }
      );
      this.$store.dispatch("setCartList");
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  background-color: white;
  div {
    padding: 20px;
    .fn {
      width: 200px;
      border: none;
      background-color: #ee0a24;
      height: 80px;
      border-radius: 100px;
      color: white;
    }
  }
}
.hidder {
  height: 100px;
  width: 100%;
}
</style>