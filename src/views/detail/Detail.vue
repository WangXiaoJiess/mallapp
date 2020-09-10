<template>
  <div>
    <van-icon class="detail_icon" name="arrow-left" @click="oneClick('/home')" />
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="商品">
        <img width="100%" :src="goods.goodsLogo" alt />
        <div class="goods_title">
          <div>{{goods.goodsName}}</div>
          <div>
            <span style="color:pink;font-size:24px;">￥{{goods.goodsPrice}}</span>
            <s style="padding: 0px 20px; color:#999">{{goods.goodsOldPrice}}</s>
          </div>
          <div class="goods_bottom">
            <span>销量{{goods.goodsBuyNum}}</span>
            <span>收藏{{goods.goodsFav}}</span>
            <span>{{goods.goodsAre}}</span>
          </div>
          <div class="icon_main">
            <div class="icon" v-for="(item,index) in icon" :key="index">
              <img width="20px" :src="item.icon" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="评论">
        <div class="comment">
          <div class="comment_title">
            <div>买家评论{{comment.length}}</div>
            <div>更多></div>
          </div>
          <div v-for="(item,index) in comment" :key="index">
            <div class="comment_top">
              <div>
                <img class="image" :src="item.comment_body.user_img" alt />
              </div>
              <div>{{item.comment_body.user_name}}</div>
            </div>
            <div class="content">{{item.comment_body.content}}</div>
            <div class="content" style="font-size:14px">
              {{item.comment_body.modified_time | filterTime}}
              <span
                style="font-size:14px"
              >颜色：默认 尺码：默认</span>
            </div>
          </div>
        </div>
        <div class="shopName">
          <div class="shopName_top">
            <img height="50px" :src="shopName.shopLogo" alt />
            <h2>{{shopName.shopName}}</h2>
          </div>
          <div class="shop_modul">
            <div class="shop_sells">
              <div>
                <div>{{shopName.snum}}</div>
                <div>总销量</div>
              </div>
              <div>
                <div>{{shopName.sells}}</div>
                <div>全部宝贝</div>
              </div>
            </div>
            <div class="shop_shopPiont">
              <table>
                <tr>
                  <td>描述相符</td>
                  <td>{{shopName.shopPiont}}</td>
                </tr>
                <tr>
                  <td>价格合理</td>
                  <td>{{shopName.shopPriceOk}}</td>
                </tr>
                <tr>
                  <td>质量满意</td>
                  <td>{{shopName.shopQuality}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="shop_bottom">
            <button class="shop_fn">进店逛逛</button>
          </div>
        </div>
      </van-tab>
      <van-tab title="详情">
        <div class="goodsIntroduce" v-html="goods.goodsIntroduce"></div>
      </van-tab>
      <van-tab title="推荐">
        <div class="Home_List">
          <CartList
            v-for="(item,index) in ShowGoods"
            :key="index"
            :ListItem="item"
            @onClick="onClick"
          />
        </div>
      </van-tab>
      <div class="hidder"></div>
    </van-tabs>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="gotoCart" :badge="num.length" />
      <van-goods-action-icon icon="like-o" text="收藏" />
      <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import {
  getGoodsInfo,
  getShowGoods,
  getCart,
  postaddCart,
} from "../../api/api";
import CartList from "../../components/CartList";
export default {
  metaInfo: {
    title: "详情",
  },
  data() {
    return {
      active: "0",
      goods: {},
      icon: {},
      shopName: {},
      comment: [],
      ShowGoods: [],
    };
  },
  computed:{
    num:function(){
      return this.$store.state.CartList
    }
  },
  components: {
    CartList,
  },
  mounted() {
    if(!this.$route.query.id){
      this.$route.query.id = this.$store.state.id
    }
    getGoodsInfo({ goodsId: this.$route.query.id }).then((res) => {
      console.log(res);
      this.goods = res.data[0];
      this.shopName = res.data[1];
      this.icon = res.data[2];
      this.comment = res.data[3];
      this.comment.forEach((element) => {
        if (element == null) {
          this.comment = [];
        }
      });
    });
    getShowGoods({ page: 1, sortType: "new" })
      .then((res) => {
        // console.log(res.data);
        this.ShowGoods = [...res.data];
        this.finished = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    gotoCart() {
      this.$router.push("/cart");
    },
    oneClick(path) {
      this.$router.push(path);
    },
    onClick(item) {
      // console.log(item)
      this.$router.push({
        path: "/detail",
        query: {
          id:item.goodsId
        },
      });
    },
    addCart() {
      postaddCart({
        product_id: this.goods.goodsId,
        product_amount: 1,
        price: this.goods.goodsPrice,
      }).then((res) => {
        console.log(res);
      })

      this.$store.dispatch("setCartList");
    },
  },
  filters: {
    filterTime(v) {
      if (/^(-)?\d{1,10}$/.test(v)) {
        v = v * 1000;
      } else if (/^(-)?\d{1,13}$/.test(v)) {
        v = v * 1;
      }
      var dateObj = new Date(v);
      var month = dateObj.getMonth() + 1;
      var day = dateObj.getDate();
      var hours = dateObj.getHours();
      var minutes = dateObj.getMinutes();
      var seconds = dateObj.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      var UnixTimeToDate =
        dateObj.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return UnixTimeToDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.hidder {
  height: 100px;
}
.detail_icon {
  position: fixed;
  top: 28px;
  left: 8px;
  z-index: 100;
}
.goods_title {
  padding: 20px;
  border-bottom: 20px solid #dfe8f0;
}
.goods_bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  line-height: 30px;
  font-size: 13px;
  border-bottom: 1px solid hsla(0, 0%, 39.2%, 0.1);
  color: #999;
  span {
    font-size: 12px;
  }
}
.icon_main {
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #999;
    }
  }
}
.comment {
  width: 90%;
  padding: 0px 5%;
  border-bottom: 20px solid #dfe8f0;
}
.comment_title {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  div {
    font-size: 14px;
  }
}

.comment_top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0px;
  .image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.content {
  color: #999;
  margin: 10px 0px;
}
.shopName {
  padding: 20px 10px;
  border-bottom: 20px solid #dfe8f0;
  .shopName_top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h2 {
      font-size: 40px;
      margin-left: 18px;
    }
  }
  .shop_modul {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    .shop_sells {
      width: 40%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #333;
      text-align: center;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    table {
      tr {
        td {
          padding: 0px 20px;
        }
      }
    }
  }
  .shop_bottom {
    text-align: center;
    padding: 30px 0px;
    .shop_fn {
      border: none;
      padding: 20px 30px;
    }
  }
}
.goodsIntroduce {
  width: 375;
  overflow: hidden;
}
.goodsIntroduce >>> img {
  width: 375;
}
.Home_List {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>