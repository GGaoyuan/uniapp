<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onReady } from "@dcloudio/uni-app";
import titleHeader from "@/pages/regist/components/regist-header.vue";
import userinfo from "@/pages/regist/components/regist-userinfo.vue";
import carinfo from "@/pages/regist/components/regist-carinfo.vue";
import imageGrid from "@/pages/regist/components/regist-image-grid.vue";

let headerTitle = {
  userinfo: "用户信息",
  carinfo: "车辆信息",
  purchaseRecord: ref("购买记录"),
  motorPics: ref("车辆照片"),
};
</script>

<template>
  <view class="container">
    <titleHeader :title="headerTitle.userinfo"></titleHeader>

    <userinfo></userinfo>

    <titleHeader :title="headerTitle.carinfo"></titleHeader>

    <carinfo></carinfo>

    <titleHeader :title="headerTitle.purchaseRecord.value"></titleHeader>

    <imageGrid :max-count="2"></imageGrid>
	
    <titleHeader :title="headerTitle.motorPics.value"></titleHeader>

    <imageGrid :max-count="4"></imageGrid>
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
</style>
