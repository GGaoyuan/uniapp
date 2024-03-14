<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad,
		onReady,
	} from "@dcloudio/uni-app";
	import titleHeader from "/pages/regist/components/regist-header.vue"
	import userinfo from "/pages/regist/components/regist-userinfo.vue"
	import carinfo from "/pages/regist/components/regist-carinfo.vue"

	const userinfoTitle = "用户信息";
	const carinfoTitle = "车辆信息";
</script>

<template>
	<view class="container">
		<titleHeader :title="userinfoTitle"></titleHeader>
			
		<userinfo>

		</userinfo>

		<titleHeader :title="carinfoTitle"></titleHeader>

		<!-- <view class="input-container">

		</view> -->

		<view class="header"></view>



	</view>
</template>

<style scoped lang="scss">
	.header {
		height: 88rpx;
		background-color: red
	}

	////////////////
	.container {
		display: flex;
		flex-direction: column;
		background-color: #F2F2F2;
	}

	.input-container {
		height: 200rpx;
		background-color: black
	}
</style>