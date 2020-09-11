<template>
  <div>
    <van-nav-bar :title="$route.meta.title" fixed left-arrow @click-left="onClickLeft" />
    <div class="hidder"></div>

    <div class="money">￥{{totle}}元</div>
    <div
      style="text-align:center;font-size:14px;color:gray;margin:10px 0px;"
      v-for="(item,index) in  order"
      :key="index"
    >订单编号：{{item.orderNumber}}</div>

    <div class="order_item" v-for="(item,index) in List" :key="index">
      <div class="item_title">
        <img width="50px" :src="item.img" alt />
        <div>{{item.title}}</div>
      </div>
      <van-radio-group v-model="radio">
        <van-radio :name="index" icon-size="24px"></van-radio>
      </van-radio-group>
    </div>

    <van-password-input
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      v-show="showKeyboard"
    />
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
    <van-button class="primary" type="primary" @click="onClick" size="large">确认支付</van-button>
  </div>
</template>

<script>
import { postverifyPayPWD, postpayOrder, postappWebPay } from "../../api/api";
import md5 from "js-md5";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  metaInfo: {
    title: "订单支付",
  },
  data() {
    return {
      order: [],
      radio: 2,
      value: "",
      showKeyboard: false,
      totle: 0,
      List: [
        {
          img: require("../../assets/zhifubao.png"),
          title: "支付宝支付",
          checked: false,
        },
        {
          img: require("../../assets/weixin.png"),
          title: "微信支付",
          checked: false,
        },
        {
          img: require("../../assets/yue.png"),
          title: "余额支付",
          checked: false,
        },
      ],
    };
  },
  created() {
    console.log(this.$route.query.order);
    if (this.$route.query.order) {
      this.order = this.$route.query.order;
    }
    this.totle = this.$store.state.totle / 100;
  },
  watch: {
    value: function (newvalue) {
      if (newvalue.length == 6) {
        let str = md5(newvalue);
        postverifyPayPWD({ paypwd: str }).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            let List = this.$store.state.OrderList;
            // console.log(List)
            let orderNumber = [];
            List.forEach((ele) => {
              // console.log(ele.orderNumber)
              orderNumber.push(ele.orderNumber);
            });
            let strorderNumber = orderNumber.join(" ");
            postpayOrder({
              orderNum: strorderNumber,
            }).then((res) => {
              console.log(res);
              if (res.code == 201) {
                this.$router.push("payOrderIsOK");
              }
            });
          }
        });
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/buyGoods",
      });
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    onClick() {
      let order = this.$route.query.order[0];
      if (this.radio == 2) {
        this.showKeyboard = true;
        this.value = "";
      } else if (this.radio == 0) {
        postappWebPay({
          OutTradeNo: order.orderNumber,
          TotalAmount: order.orderPrice,
          Subject: "手机网站支付测试",
          ProductCode: "QUICK_WAP_WAY",
        }).then((res) => {
          console.log(res);
          if (res.code == 201) {
            var html = res.data;
            const div = document.createElement("div");
            div.innerHTML = html;
            document.body.appendChild(div);
            document.forms[0].submit();
          } else if (res.code == 404) {
            Notify(res.msg);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hidder {
  height: 100px;
  width: 100%;
}
.order_item {
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item_title {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      padding: 0px 20px;
    }
  }
}
.primary {
  position: fixed;
  bottom: 0;
}
.money {
  text-align: center;
  font-size: 40px;
  color: red;
}
</style>