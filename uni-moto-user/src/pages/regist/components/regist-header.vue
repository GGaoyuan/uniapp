<script setup lang="ts">
	const props = defineProps({
		title: String,
	})
</script>

<template>
	<view class="content">
		<view class="line"></view>
		<text class="titleText">{{ props.title }}</text>
	</view>
</template>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: row;
		background-color: yellow;
		margin-left: 40rpx;
		margin-right: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}

	.line {
		background-color: #3D77F0;
		width: 8rpx;
	}

	.titleText {
		margin-left: 15rpx;
		color: #222222;
	}
</style>