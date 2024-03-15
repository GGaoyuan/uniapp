<script setup lang="ts">
import { ref, onMounted, computed, type PropType } from "vue";
import { ApplyInfo } from "@/pages/motor/motor-apply-interface";

let props = defineProps({
  data: {
    type: Object as PropType<ApplyInfo>,
    default: {},
  },
});

let text = ref<string>();
let textColor = ref<string>();

onMounted(() => {
  if (props.data.status == 0) {
    text.value = "待审核";
    textColor.value = "#3D77F0";
  } else if (props.data.status == 1) {
    text.value = "已通过";
    textColor.value = "orange";
  } else if (props.data.status == 2) {
    text.value = "已安装";
    textColor.value = "orange";
  } else if (props.data.status == 3) {
    text.value = "已驳回";
    textColor.value = "red";
  } else if (props.data.status == 4) {
    text.value = "已取消";
    textColor.value = "red";
  }
});

onMounted(() => {});
</script>

<template>
  <view class="container">
    <view class="title-area">
      <text class="title-style">{{ props.data.motorType }}</text>
      <text class="status-text" v-bind:style="{ color: textColor }">{{
        text
      }}</text>
    </view>
    <view class="line"></view>

    <view class="content-item" v-if="props.data.motorBrand.length > 0">
      <text class="item-title">车辆品牌:</text>
      <view class="clear-box"></view>
      <text class="item-content">{{ props.data.motorBrand }}</text>
    </view>
    <view class="content-item" v-if="props.data.motorColor.length > 0">
      <text class="item-title">车辆颜色:</text>
      <view class="clear-box"></view>
      <text class="item-content">{{ props.data.motorColor }}</text>
    </view>
    <view class="content-item" v-if="props.data.motorNumber.length > 0">
      <text class="item-title">车辆编号:</text>
      <view class="clear-box"></view>
      <text class="item-content">{{ props.data.motorNumber }}</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: white;
  margin-top: 30rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;
  border: 1rpx solid #fff;
  border-radius: 16rpx;
  padding-bottom: 12rpx;

  .title-area {
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 12rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    margin-bottom: 12rpx;

    .title-style {
      font-size: 40rpx;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: #222222;
    }

    .status-text {
      font-size: 30rpx;
      font-family: PingFangSC-Medium;
      font-weight: bold;
    }
  }

  .line {
    height: 0.5rpx;
    background-color: #f2f2f2;
  }

  .content-item {
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    align-items: baseline;

    margin-top: 12rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    margin-bottom: 12rpx;

    .item-title {
      font-size: 32rpx;
      font-family: PingFangSC-Regular;
      font-weight: normal;
      color: #222222;
      word-break: keep-all;
    }

    .clear-box {
      width: 10rpx;
    }

    .item-content {
      word-break: break-all;
      font-size: 32rpx;
      font-family: PingFangSC-Regular;
      font-weight: normal;
      color: #999999;
    }
  }
}
</style>@/pages/motor/moto-apply-interface
