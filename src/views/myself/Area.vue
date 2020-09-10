<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import List from "../../../public/san.js";
import { postaddArea } from "../../api/api";
export default {
  metaInfo: {
    title: "新增收货地址",
  },
  data() {
    return {
      areaList: [],
      searchResult: [],
    };
  },
  created() {
    // console.log(List);
    this.areaList = List;
  },
  methods: {
    onClickLeft() {
      this.$router.push("/ship");
    },
    onSave(content) {
      console.log(content);
      postaddArea({
        Name: content.name,
        Phone: content.tel,
        Province: content.province,
        City: content.city,
        District: content.county,
        Address: content.addressDetail,
        IsDefault: content.isDefault,
      }).then((res) => {
        console.log(res);
        if (res.code == 201) {
          this.$router.push("/ship");
        } else {
          Toast(res.msg);
        }
      });
      Toast("保存成功");
    },
  },
};
</script>

<style>
</style>