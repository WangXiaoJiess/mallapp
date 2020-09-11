<template>
  <div>
    <van-nav-bar :title="$route.meta.title" fixed left-arrow @click-left="onClickLeft" />
    <div class="hidder"></div>
    <div class="box" v-for="(item,index) in rate" :key="index">
      <van-row class="row">
        <van-col span="4">
          <img class="user_img" width="100%" :src="item.user_img" alt />
        </van-col>
        <van-col span="20">
          <div class="user_name">
            <span>{{item.user_name}}</span>
            <van-rate v-model="item.msvalue" size="16" />
            <span>{{item.msvalue}}分</span>
          </div>
          <div class="audit_time">{{item.audit_time | filterTime}}</div>
        </van-col>
      </van-row>
      <div class="content">
        <div>{{item.content}}</div>
        <div>
          <img
            v-for="(item,index) in item.imgURL"
            :key="index"
            width="80px"
            height="80px"
            :src="item"
            alt
          />
        </div>
        <div class="replies_num">
          <div>浏览{{item.replies_num}}次</div>
          <div>
            <span>
              <van-icon name="chat-o" />
              {{item.commnet_sum}}
            </span>
            <span>
              <van-icon name="good-job-o" />
              {{item.is_useful}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllRateByGoodsId } from "../../api/api";
export default {
  metaInfo: {
    title: "所有评价",
  },
  data() {
    return {
      rate: [],
    };
  },
  created() {
    console.log(this.$route.query.id);
    getAllRateByGoodsId({
      good_id: this.$route.query.id,
      page: "1",
      page_size: "30",
    }).then((res) => {
      console.log(res.data);
      this.rate = res.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push("/detail");
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
* {
  font-size: 20px;
}
.hidder {
  width: 100%;
  height: 100px;
}

.box {
  border-bottom: 20px solid rgba(219, 215, 215, 0.788);
  .row {
    padding: 20px;
    .user_img {
      border-radius: 50%;
      height: 100px;
    }
    .user_name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        padding: 0px 40px;
      }
    }
    .audit_time {
      padding: 20px;
    }
  }
  .content {
    padding: 10px 50px;
    div{
      padding: 10px 0px;
    }
    .replies_num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        span {
          padding: 0px 20px;
        }
      }
    }
  }
}
</style>