<template>
  <div>
    <div class="user">
      <img class="user_top" width="100%" src="../../assets/user.png" alt />
      <div class="user_top_title">
        <div>
          <img width="80px" :src="user.user_img" alt />
        </div>
        <div class="size">
          <p>{{user.login_name}}</p>
          <p>男士</p>
          <p>{{user.mobile_phone}}</p>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <div class="sign" @click="onsign">{{sign[signindex]}}</div>
        </div>
      </div>

      <div class="bottom_title">
        <p>每天领红包，年卡仅0.12元/天</p>
        <button class="user_fn">立即开通</button>
      </div>
    </div>

    <div class="box"></div>
    <div class="user_main">
      <div>
        <span>账号余额</span>
        <span>
          <b>{{user.user_money}}</b>元
        </span>
      </div>
      <div>
        <span>积分</span>
        <span>
          <b>{{user.user_point}}</b>分
        </span>
      </div>
    </div>

    <div class="bottom_List">
      <div class="List_title">
        <h1 style="font-size:24px">我的订单</h1>
        <span style="font-size:12px;color: #646566;" @click="goto('/order')">查看全部订单 ></span>
      </div>
      <van-grid>
        <van-grid-item
          v-for="(item,index) in orderList"
          :key="index"
          icon="photo-o"
          :text="item.title"
          :to="item.path"
        >
          <template #icon>
            <img :src="item.icon" alt />
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="user_image">
      <img width="100%" src="../../assets/user_image.png" alt />
    </div>

    <div class="bottom_List">
      <h1 style="font-size:24px">常用功能</h1>
      <van-grid>
        <van-grid-item
          v-for="(item,index) in userList"
          :key="index"
          icon="photo-o"
          :text="item.title"
          :to="item.path"
        >
          <template #icon>
            <img :src="item.icon" alt />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getUserData } from "../../api/api";
export default {
  metaInfo: {
    title: "我的",
  },
  data() {
    return {
      user: [],
      sign: ["签到领积分", "已签到"],
      userList: [
        {
          icon: require("../../assets/icon/shouhuodizhi.png"),
          title: "收货地址",
          path: "/ship",
        },
        {
          icon: require("../../assets/icon/shoucang.png"),
          title: "我的收藏",
        },
        {
          icon: require("../../assets/icon/jilu.png"),
          title: "浏览记录",
        },
        {
          icon: require("../../assets/icon/shezhi.png"),
          title: "设置",
          path: "/setting",
        },
      ],
      orderList: [
        {
          icon: require("../../assets/icon/quanbu.png"),
          title: "全部",
          path: "/order",
        },
        {
          icon: require("../../assets/icon/daizhifu.png"),
          title: "待支付",
        },
        {
          icon: require("../../assets/icon/daishouhuo.png"),
          title: "待收货",
        },
        {
          icon: require("../../assets/icon/daipingjia.png"),
          title: "待评价",
          path: "",
        },
      ],
    };
  },
  computed: {
    signindex: function () {
      return this.$store.state.signindex;
    },
  },
  mounted() {
    getUserData({ token: this.$store.state.token }).then((res) => {
      // console.log(res.data);
      if (res.data == null) {
        this.user = [];
      } else {
        this.user = res.data;
      }
    });
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    onsign() {
      this.$store.dispatch("setsignindex", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: rgb(231, 229, 229);
  width: 100%;
  height: 1000px;
  position: absolute;
  z-index: -1;
}
.user {
  height: 330px;
  position: relative;
}
.user_top {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.user_top_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  color: white;
  .sign {
    background-color: #ff6565;
    padding: 20px 10px;
    border-radius: 40px;
    font-size: 14px;
  }
  .size {
    p {
      font-size: 14px;
    }
  }
}
.List_title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.bottom_title {
  height: 50px;
  position: absolute;
  left: 4%;
  bottom: 8px;
  width: 92%;
  background-color: #3b4a67;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#506183),
    to(#2d384c)
  );
  background: linear-gradient(90deg, #506183, #2d384c);
  border-radius: 10px 10px 0 0;
  padding: 10px 0px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 14px;
    color: white;
    padding: 0px 40px;
  }
  .user_fn {
    background-color: #3b4a67;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#40e865),
      to(#1ebb4e)
    );
    background: linear-gradient(90deg, #40e865, #1ebb4e);
    border: none;
    font-size: 14px;
    color: #2d3947;
    border-radius: 30px;
    padding: 0px 10px;
    margin-right: 20px;
  }
}
.bottom_List {
  width: 78%;
  margin: 0 auto;
  padding: 20px 40px;
  border-radius: 10px;
  background-color: white;
}
.user_main {
  background: #fff;
  width: 76%;
  height: 80px;
  margin: 20px auto;
  padding: 0px 50px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 16px;
  }
}
.user_image {
  background: #fff;
  width: 76%;
  margin: 30px auto;
  padding: 20px 50px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>