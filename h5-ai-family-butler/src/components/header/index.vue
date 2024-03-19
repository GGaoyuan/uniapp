<script setup lang="ts">
import { back } from "@/utils/router";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const goBack = () => {
  back(-1);
};
</script>

<template>
  <div class="header-contianer">
    <div class="header-back-img" @click="goBack()">
      <image src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/header-back.png"></image>
    </div>
    <span class="header-title">{{ title }}</span>
  </div>
</template>

<style scoped lang="scss">
.header-contianer {
  box-sizing: border-box;
  width: 100%;
  height: 48rpx;
  text-align: center;
  .header-back-img {
    float: left;
    width: 48rpx;
    height: 46rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .header-title {
    text-align: center;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    font-size: 34.62rpx;
    color: #272727;
  }
}
</style>
