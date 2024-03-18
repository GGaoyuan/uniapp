<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const emits = defineEmits(
  ['addImage'])// 定义一个或多个自定义事件

const motorTypeList = [
  {
    text: "电动车",
    value: 0,
  },
  {
    text: "自行车",
    value: 1,
  },
]
const motorBrand = ref();
const motorColor = ref();
const motorType = ref(0);
defineExpose({
  motorType,
  motorBrand,
  motorColor,
});

function change() {
  console.log("change");
  console.log("motorType:" + motorType.value);
  console.log("motorBrand:" + motorBrand.value);
  console.log("motorColor:" + motorColor.value);
  emits('addImage', 20);
}
</script>

<template>
  <view class="regist-info-container">
    <view class="regist-info-context">
      <text>车辆类型</text>
      <uni-data-checkbox
        class="test"
        v-model="motorType"
        :localdata="motorTypeList"
        @change="change"
      ></uni-data-checkbox>
    </view>
    <view class="regist-info-context">
      <text>车辆品牌</text>
      <input
        v-model="motorBrand"
        placeholder="请输入车辆品牌"
      />
    </view>
    <view class="regist-info-context">
      <text>车辆颜色</text>
      <input v-model="motorColor" placeholder="请输入车辆颜色" />
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
