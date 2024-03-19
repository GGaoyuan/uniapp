<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onReady } from "@dcloudio/uni-app";
import titleHeader from "@/pages/regist/components/regist-header.vue";
import userinfo from "@/pages/regist/components/regist-userinfo.vue";
import carinfo from "@/pages/regist/components/regist-carinfo.vue";
import imageGrid from "@/pages/regist/components/regist-image-grid.vue";

const titles = ref({
  userinfo: "用户信息",
  carinfo: "车辆信息",
  purchaseRecord: "购买记录",
  motorPics: "车辆照片",
});
const userinfoRef = ref(null);
const carinfoRef = ref();

const addPurchaseImageCallback = (params: string) => {
  titles.value.purchaseRecord = `购买记录(${params})`
};
const addMotorImageCallback = (params: string) => {
  titles.value.motorPics = `车辆照片(${params})`
};

function registAction() {
  console.log("registAction");
  console.log(
    "userType:",
    userinfoRef.value.userType,
    "name:",
    userinfoRef.value.name,
    "stu_academy:",
    userinfoRef.value.stu_academy,
    "stu_class:",
    userinfoRef.value.stu_class,
    "stu_num:",
    userinfoRef.value.stu_num,
    "tch_num:",
    userinfoRef.value.tch_num,
    "phone:",
    userinfoRef.value.phone
  );

  console.log(
    "motorType:",
    carinfoRef.value.motorType,
    "motorBrand:",
    carinfoRef.value.motorBrand,
    "motorColor:",
    carinfoRef.value.motorColor
  );
  return;
  uni.showLoading({
    title: "加载中",
  });
  uni.request({
    url: "http://pyyh.l2.ttut.cc/manager/vehicle/add",
    method: "POST",
    // header: {
    // 	Authorization:'Bearer '+ token
    // },
    data: {
      ownerType: 0, //车主身份0.学生  1.教职工  2.其他
      vehicleColor: "rgb", //车辆颜色
      rfidId2: null,
      movePhone: "1", //电话
      photos: "77",
      rfidId1: null,
      vehicleBrand: "TJDW", //车辆品牌
      ownerNumber: "gg", //
      ownerName: "neijunchao",
      id: 0,
      validity: 0,
      vehicleType: 0,
      registDate: null,
      unitIndex: 14,
    },
    success: (response) => {
      if (response.statusCode == 401) {
        uni.showToast({
          icon: "error",
          position: "top",
          title: "出错了，请尝试重新登录！",
        });
        return;
      }
      console.log("success", response);
      // return resolve(response)
    },
    fail: (err) => {
      console.log("error", err);
      // return reject(err);
    },
    complete() {
      uni.hideLoading();
    },
  });

  /**
   * 1.扫码进去小程序
   * 2.用户提交申请
   * 3.公众号接受推送消息
   * 4.小程序中间加图标
   */
}
</script>

<template>
  <view class="container">
    <titleHeader :title="titles.userinfo"></titleHeader>

    <userinfo ref="userinfoRef"></userinfo>

    <titleHeader :title="titles.carinfo"></titleHeader>

    <carinfo ref="carinfoRef"></carinfo>

    <titleHeader :title="titles.purchaseRecord"></titleHeader>

    <imageGrid :max-count="2" @addImages="addPurchaseImageCallback"></imageGrid>

    <titleHeader :title="titles.motorPics"></titleHeader>

    <imageGrid :max-count="4" @addImages="addMotorImageCallback"></imageGrid>

    <view class="regist-button" @click="registAction()">
      <text>提交</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.header {
  height: 88rpx;
  background-color: red;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
}

.input-container {
  height: 200rpx;
  background-color: black;
}

.regist-button {
  display: flex;
  flex-direction: column;
  margin-top: 50rpx;
  margin-left: 50rpx;
  margin-right: 50rpx;
  margin-bottom: 30rpx;
  background-color: #3d77f0;
  color: #fff;
  height: 80rpx;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1rpx solid #3d77f0;
  border-radius: 20rpx;
  z-index: 99;
}
</style>
