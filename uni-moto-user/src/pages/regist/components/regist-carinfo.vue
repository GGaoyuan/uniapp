<script setup lang="ts">
const props = defineProps({
  title: String,
});

const motorTypes = [
  {
    text: "电动车",
    value: 0,
  },
  {
    text: "自行车",
    value: 1,
  },
];
let motorTypeValue = 0;

function change() {
  console.log("change");
}
</script>

<template>
  <view class="regist-info-container">
    <view class="regist-info-context">
      <text>车辆类型</text>
      <uni-data-checkbox
        class="test"
        v-model="motorTypeValue"
        :localdata="motorTypes"
        @change="change"
      ></uni-data-checkbox>
    </view>
    <view class="regist-info-context">
      <text>车辆品牌21122</text>
      <input
        placeholder="请输入车辆品牌"
        style="background-color: red; text-align: right"
      />
    </view>
    <view class="regist-info-context">
      <text>车辆颜色</text>
      <input placeholder="请输入车辆颜色" />
    </view>
  </view>
</template>

<style scoped lang="scss">
@import "../components/css/regist-info.css";
</style>

<style scoped>
 .test /deep/ .checklist-box {
  background-color: green;
  margin-right: 0rpx;
  margin-left: 25rpx;
}
</style>
