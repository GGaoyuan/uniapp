<script setup lang="ts">

const props = defineProps({
  title: String,
});
</script>


<template>
  <view class="container">
    <view class="common-context">
      <text>身份</text>
      <input
        placeholder="自动获得焦点"
        style="background-color: red; text-align: right"
      />
    </view>
    <view class="common-context">
      <text>身份</text>
      <input placeholder="自动获得焦点" />
    </view>
    <view class="common-context">
      <text>身份</text>
      <input placeholder="自动获得焦点" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  background-color: yellow;
  margin-left: 40rpx;
  margin-right: 40rpx;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  border: 1rpx solid white;
  border-radius: 20rpx;

  .common-context {
    display: flex;
    flex-direction: row;
    background-color: red;
    margin-left: 30rpx;
    margin-right: 30rpx;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    justify-content: space-between;
    text-align: right;

    .title-text {
    }
  }
  .checkbox {
    display: flex;
    flex-direction: row;
    background-color: red;
    margin-left: 30rpx;
    margin-right: 30rpx;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    justify-content: space-between;
  }

  .textField {
    display: flex;
    flex-direction: row;
    margin-left: 30rpx;
    margin-right: 30rpx;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    justify-content: space-between;
  }
}
</style>
