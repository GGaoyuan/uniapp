<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const userTypeList = [
  {
    text: "学生",
    value: 0,
  },
  {
    text: "教职工",
    value: 1,
  },
  {
    text: "其他",
    value: 2,
  },
];
let userType = ref(0);
let name = ref("");
let stu_num = ref("");
let stu_academy = ref("");
let stu_class = ref("");
let tch_num = ref("");
let phone = ref("");

defineExpose({
	userType,
	name,
	stu_num,
	stu_academy,
	stu_class,
	tch_num,
	phone,
});


function change() {
  	console.log(userType.value);
}
</script>

<template>
  <view class="regist-info-container">
    <view class="regist-info-context">
      <text>身份</text>
      <uni-data-checkbox
        v-model="userType"
        :localdata="userTypeList"
        @change="change"
      ></uni-data-checkbox>
    </view>
    <view class="regist-info-context">
      <text>姓名</text>
      <input v-model="name" placeholder="请输入姓名" />
    </view>


    <view class="regist-info-context" v-if="userType==0">
      <text>学号</text>
      <input v-model="stu_num" placeholder="请输入学号" />
    </view>
    <view class="regist-info-context" v-if="userType==0">
      <text>学院</text>
      <input v-model="stu_academy" placeholder="请输入学院" />
    </view>
    <view class="regist-info-context" v-if="userType==0">
      <text>班级</text>
      <input v-model="stu_class" placeholder="请输入班级" />
    </view>

	<view class="regist-info-context" v-if="userType == 1 || userType == 2">
      <text>工号</text>
      <input v-model="tch_num" placeholder="请输入工号" />
    </view>


    <view class="regist-info-context">
      <text>手机号</text>
      <input v-model="phone" placeholder="请输入手机号" />
    </view>

  </view>
</template>

<style scoped lang="scss">
@import "../components/css/regist-info.css";
</style>
