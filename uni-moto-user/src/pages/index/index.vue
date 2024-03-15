<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const title = ref("Hello");
let a = false;
import jsonData from "../../static/data/my.json";

onLoad((option) => {
  console.log("script:onLoad");

  // 使用json数据
  
  
  const resArr = jsonData.list;
  console.log(resArr);
});
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area" v-if="a">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 300rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
