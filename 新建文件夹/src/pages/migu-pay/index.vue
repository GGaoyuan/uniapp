<script lang="ts" setup>
import { reactive, ref, defineComponent } from "vue";
import { forward } from "@/utils/router";

onLoad((option) => {
  console.log(option, "我是入参");
  productId.value = option.productId;
  getUserToken();
});

// onMounted(() => {
//   getUserToken();
//   productId.value = "";
// });

const userToken = ref("");
const payUrl = ref("");
const productId = ref("");

const getUserToken = () => {
  userToken.value = uni.getStorageSync("token");
  payUrl.value =
    "https://ivr.migu.cn/ai-family-butler/static/butler/pay-ai-manage/#/?token=" +
    userToken.value + '&productId=' + productId.value;
  console.log(payUrl.value, "我是跳转url");
  
};
</script>


<template>
  <div class="userinfo-container">
    <web-view :src="payUrl"></web-view>
  </div>
</template>



<style lang="scss" scoped>
.userinfo-container {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
