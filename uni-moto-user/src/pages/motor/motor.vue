<script setup lang="ts">
import { ref, onMounted } from "vue";
import motorItem from "@/pages/motor/components/motor-item.vue";
import jsonData from "../../static/data/my.json";
import { ApplyInfo } from "@/pages/motor/motor-apply-interface";

let isLogin = ref(true);
let dataSource = ref<ApplyInfo[]>([]);
let dataLoaded = ref(false);

onMounted(() => {
  if (!isLogin.value) {
    uni.navigateTo({
      url: "../login/login",
    });
  } else {
    loadList();
  }
});

function loadList() {
  console.log("loadList");
  uni.showLoading({
    title: "加载中",
  });
  setTimeout(() => {
    dataLoaded.value = true;

    const resArr = jsonData.list;
    console.log(resArr);

    for (let index = 0; index < resArr.length; index++) {
      let data = resArr[index];
      const model: ApplyInfo = {
        id: index,
        motorType: data["motoType"],
        status: data["status"],
        motorColor: data["motoColor"],
        motorBrand: data["motoBrand"],
        motorNumber: data["motoNumber"],
      };

      dataSource.value.push(model);
    }
    uni.hideLoading();
    console.log("loadList complete");
  }, 500);
}

function registAction() {
  uni.navigateTo({
    url: "../regist/regist",
  });
  //console.log("registAction");
}
</script>

<template>
  <view>
      <view v-if="dataSource.length == 0 && dataLoaded" class="no-data">
        <image class="no-data-image" src="/static/logo.png"></image>
        <text class="no-data-title">空的</text>
      </view>

      <view class="list" v-if="dataSource.length != 0 && dataLoaded">
        <view class="AAA" @click="registAction()">
          <text>注册车辆信息</text>
        </view>

        <scroll-view
          class="list-content"
          scroll-y
          rebound="false"
          enable-flex="true"
        >
          <motorItem
            v-for="item in dataSource"
            :key="item.id"
            :data="item"
          ></motorItem>
          <view style="height: 150rpx"></view>
        </scroll-view>
      </view>
    </view>
</template>

<style lang="scss" scoped>
@import "../../static/style/common.scss";
.list {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f2f2f2;
  .regist-moto {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 20rpx;
    left: 50rpx;
    right: 50rpx;
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

  .list-content {
    display: flex;
    flex-direction: column;
    position: sticky;
    background-color: #f2f2f2;
    // padding-bottom: 100rpx;
    margin-bottom: 100rpx;
    //margin-top: 80rpx;
    flex: 1;
    // overflow: auto;
  }
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .no-data-image {
    display: flex;
    flex-direction: column;
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
  }

  .no-data-title {
    display: flex;
    flex-direction: column;
    font-size: 36rpx;
    color: #800f94;
  }
}
</style>
