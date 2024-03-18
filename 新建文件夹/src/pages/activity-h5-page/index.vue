<script lang="ts" setup>
import { reactive, ref, defineComponent } from "vue";
import { forward, back } from "@/utils/router";
import { onShareAppMessage } from "@dcloudio/uni-app";

onLoad((option) => {
  console.log(option, "我是入参");
  //   productId.value = option.productId;
  goType.value = option.goType;
  getUserToken();
  console.log();
});

const userToken = ref("");
const payUrl = ref("");
const productId = ref("");
const id = ref("12312312313");
const goType = ref("home");

const getUserToken = () => {
  userToken.value = uni.getStorageSync("token");
  if (goType.value === "home") {
    payUrl.value =
      "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/new-year-activity/#/?token=" +
      userToken.value +
      "&productId=" +
      productId.value;
  } else {
    payUrl.value =
      "https://ivr.migu.cn/ai-family-butler/static/butler/picture/static/new-year-activity/#/mybless?token=" +
      userToken.value +
      "&productId=" +
      productId.value;
  }

  console.log(payUrl.value, "我是跳转url");
};

// 1.发送给朋友
onShareAppMessage((res) => {
  id.value = "321321321321321";
  return {
    title: "试一试分享",
    path: `pages/first-guide/index?id=${id.value}`,
  };
  // return res;
});
//2.分享到朋友圈
const onShareTimeline = (res) => {
  return res;
};

const goBack = () => {
  back(-1);
};
</script>


<template>
  <div class="home-container">
    <web-view :src="payUrl"></web-view>
  </div>
</template>



<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100vh;
}
</style>
