<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :show-detail="false"
      :show-area="false"
      show-set-default
      :address-info="ressList"
      @save="onSave"
      show-delete
      @delete="ondelete"
    >
      <template #default>
        <div class="default">
          <span style="color:#646566">省份:</span>
          <input class="input" type="text" v-model="sheng" />
        </div>
        <div class="default">
          <span style="color:#646566">市区:</span>
          <input class="input" type="text" v-model="shi" />
        </div>
        <div class="default">
          <span style="color:#646566">县城:</span>
          <input class="input" type="text" v-model="xian" />
        </div>
        <div class="default">
          <span style="color:#646566">详细地址:</span>
          <input class="input" type="text" v-model="address" />
        </div>
      </template>
    </van-address-edit>
  </div>
</template>

<script>
import { Notify } from 'vant';
import List from "../../../public/san.js";
import { patchaddArea, postaddArea, patchdeleteArea } from "../../api/api";
export default {
  metaInfo: {
    title: "修改收货地址",
  },
  data() {
    return {
      address: "",
      areaList: {},
      searchResult: [],
      ressList: [],
      sheng: "",
      shi: "",
      xian: "",
    };
  },
  created() {
    console.log(this.$route.query.item);
    let item = this.$route.query.item;
    this.areaList = List;
    this.ressList = item;
    this.address = item.address;
    this.sheng = item.province;
    this.shi = item.city;
    this.xian = item.district;
  },
  methods: {
    onSave(content) {
      patchaddArea({
        CustomerAddrId: content.customerAddrId,
        CustomerId: content.customerId,
        Name: content.name,
        Phone: content.tel,
        Province: this.sheng,
        City: this.shi,
        District: this.xian,
        Address: this.address,
        IsDefault: content.isDefault,
        IdDel: content.tel,
      }).then((res) => {
        console.log(res);
        if (res.code == 201) {
          postaddArea({
            Name: content.name,
            Phone: content.tel,
            Province: this.sheng,
            City: this.shi,
            District: this.xian,
            Address: this.address,
          }).then((res) => {
            console.log(res);
            if (res.code == 201) {
              this.$router.push("/ship");
            } else {
              Toast(res.msg);
            }
          });
        }
      });
    },
    onClickLeft() {
      this.$router.push("/ship");
    },
    //  删除订单
    ondelete() {
      // console.log(this.$route.query.item);
      let item = this.$route.query.item;
      console.log(item);
      patchdeleteArea({
        userid: item.customerId,
        areaId: item.id,
      }).then((res) => {
        console.log(res);
        if(res.code == 201){
          this.$router.push('/ship')
        }else{
          Notify({ type: 'danger', message: res.msg });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  align-items: center;
  span {
    width: 26%;
    margin: 0 20px;
    display: block;
    text-align: center;
  }
}
.input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 20px;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}
</style>