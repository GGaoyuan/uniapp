<script setup>
	const props = defineProps({
		title: String,
	})
  
	const identitys = [{
		text: '学生',
		value: 0
	}, {
		text: '教职工',
		value: 1
	}, {
		text: '其他',
		value: 2
	}];
	let userIdentity = 0;

	function change() {
		console.log("change");
	}
</script>

<template>
	<view class="content">
		<view class="common-context">
			<text>身份</text>
			<uni-data-checkbox v-model="userIdentity" :localdata="identitys" @change="change"></uni-data-checkbox>
		</view>
		<view class="common-context">
			<text>身份</text>
			<input placeholder="自动获得焦点" style="background-color: red; text-align: right;"/>
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
	

	.content {
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

	.titleText {
		margin-left: 15rpx;
		color: #222222;
	}
</style>