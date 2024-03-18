<script setup lang="ts">
import { back } from '@/utils/router';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  fixed: { type: [Boolean, String], default: true }
});

const emits = defineEmits(['confirm', 'close']);

const app = getApp();
const statusBarH = ref(app.globalData.statusBarH);
const _customBarH = app.globalData.customBarH - app.globalData.statusBarH;
const customBarH = ref(_customBarH);

const goBack = () => {
  back(-1);
};

onMounted(() => {});
</script>

<template>
  <view
    class="nav-bar"
    :class="{ fixed }"
    :style="{
      height: `${customBarH}px`,
      'padding-top': `${statusBarH}px`
    }"
  >
    <view class="nav-bar-left" @click="goBack"
      ><image src="https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/images/header-back.png"></image
      ><slot name="back"></slot
    ></view>
    <view class="nav-bar-title">{{ title }}</view>
  </view>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  background: #fff;
  &.fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    width: 100%;
  }
}
.nav-bar-left {
  position: absolute;
  left: 38rpx;
  image {
    width: 48rpx;
    height: 46rpx;
  }
}
.nav-bar-title {
  flex: 1;
  text-align: center;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  font-size: 34.62rpx;
  color: #272727;
}
</style>
