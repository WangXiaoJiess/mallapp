<template>
  <div>
    <van-nav-bar :title="$route.meta.title" fixed left-arrow @click-left="onClickLeft" />
    <div class="hidder"></div>
    <div class="areaList" v-for="(item,index) in areaList" :key="index" v-show="index == allindex">
      <div class="areaList_left">
        <img src="../../assets/buyGoods_img.png" alt />
      </div>
      <div @click="goto" class="areaList_main">
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
    </div>
    <div class="buyGoods_main" v-for="(item,index) in buyGoods" :key="index">
      <div class="main_title">
        <img :src="item[1].shopLogo" alt />
        <div>{{item[1].shopName}}</div>
        <van-icon name="arrow" />
      </div>
      <div class="mian_goods">
        <img :src="item[0].goodsLogo" alt />
        <div class="goods_title">
          <p>{{item[0].goodsName}}</p>
          <p>原价：{{item[0].goodsOldPrice}}</p>
          <p>
            <span>七天退换</span>
          </p>
        </div>
        <div>
          <b>￥{{item[0].goodsPrice}}</b>
          <div style="text-align:center">×{{buyList[index].product_amount}}</div>
        </div>
      </div>
      <div class="goods_xian">
        <img src="../../assets/xian.png" alt />
        <div class="xian_main">
          <b>运费险</b>
          <p style="color:#666">确认收货前退货可理赔</p>
        </div>
        <div>
          <b>￥15.00</b>
          <p style="text-align:center">×1</p>
        </div>
      </div>
      <div class="main_zong">
        <div>
          <div>商品总价</div>
          <div>￥{{item[0].goodsPrice}}</div>
        </div>
        <div>
          <div>运费(快递)</div>
          <div>￥0.00</div>
        </div>
        <div>
          <div>运费险(卖家赠送)</div>
          <div>￥0.00</div>
        </div>
      </div>
      <div class="main_xiao">
        <div>商品小计</div>
        <div style="color:red">￥{{item[0].goodsPrice * buyList[index].product_amount}}</div>
      </div>
    </div>
    <div class="hidder"></div>
    <van-submit-bar :price="totel" button-text="去支付" @submit="onSubmit" />
  </div>
</template>

<script>
import { getOrderInfo, getArea, postcretaeOrder } from "../../api/api";
import { mapMutations } from "vuex";
export default {
  metaInfo: {
    title: "确认订单",
  },
  data() {
    return {
      buyList: [],
      buyGoods: [],
      totel: 0,
      areaList: [],
      allindex: 0,
    };
  },
  computed: {
    CartList: function () {
      return this.$store.state.CartList;
    },
  },
  mounted() {
    // console.log(this.$route.query.index)
    this.CartList.forEach((element) => {
      if (element.ischecked == true) {
        this.buyList.push(element);
      }
    });
    console.log(this.buyList);
    var a = [];
    this.buyList.forEach((element) => {
      a.push(element.product_id);
    });
    var str = a.join(" ");
    console.log(str);
    getOrderInfo({ goodsid: str }).then((res) => {
      console.log(res.data);
      this.buyGoods = [...res.data];
      this.buyGoods.forEach((element, index) => {
        this.totel +=
          element[0].goodsPrice * this.buyList[index].product_amount * 100;
      });
    });
    getArea().then((res) => {
      console.log(res.data);
      this.areaList = res.data;
      console.log(this.areaList);
    });

    if (this.$route.query.index) {
      this.allindex = this.$route.query.index;
    }
  },
  methods: {
    ...mapMutations({
      setOrderList: "setOrderList",
    }),
    onClickLeft() {
      this.$router.push({
        path: "/cart",
      });
    },
    onSubmit() {
      let consignee = this.areaList[this.allindex];
      let addr = [
        consignee.name,
        consignee.phone,
        consignee.province,
        consignee.city,
        consignee.district,
        consignee.address,
      ];
      var addrstr = addr.join(",");
      let id = [];
      this.buyGoods.forEach((element) => {
        id.push(element[0].goodsId);
      });
      let strid = id.join(" ");
      let num = 0;
      this.buyList.forEach((element) => {
        num += element.product_amount;
      });
      // console.log(this.totel)
      // console.log(addrstr)
      // console.log(strid);
      postcretaeOrder({
        price: this.totel / 100,
        consignee_addr: addrstr,
        goodsId: strid,
        isFcart: true,
      }).then((res) => {
        console.log(res);
        this.setOrderList(res.data);
        this.$router.push({
          path: "/payOrder",
          query: {
            order:res.data
          },
        });
      });
    },
    goto() {
      this.$router.push("/selectArea");
    },
  },
};
</script>

<style lang="scss" scoped>
.areaList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
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
.buyGoods_main {
  border-bottom: 20px solid rgb(224, 222, 222);
  .main_title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 40px 20px 20px 20px;
    img {
      border-radius: 50%;
      width: 50px;
    }
  }
  .mian_goods {
    padding: 0px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    img {
      border-radius: 20px;
    }
    .goods_title {
      display: flex;
      flex-direction: column;
      p {
        padding: 15px 0px;
        font-size: 16px;
      }
    }
  }
  .goods_xian {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    img {
      width: 80px;
    }
    .xian_main {
      width: 70%;
    }
  }
  .main_zong {
    padding: 20px;
    div {
      display: flex;
      justify-content: space-between;
      color: #666;
    }
  }
  .main_xiao {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    div {
      font-size: 40px;
    }
  }
}
.hidder {
  height: 100px;
  width: 100%;
}
</style>